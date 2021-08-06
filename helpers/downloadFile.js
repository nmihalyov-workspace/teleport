import { api_query } from '../api';

const downloadFile = data => {
  api_query.post('/user/download_document', data, {responseType: 'blob'})
  .then(res => {
    if (res.status === 200) {
      const fileType = res.headers['content-type'];
      const fileName = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 8);
      const donwloadFileElement = document.createElement('a');
      const fileBlob = new Blob([res.data], {type: fileType});
      const fileURL  = window.URL.createObjectURL(fileBlob);
      
      document.body.appendChild(donwloadFileElement);
      donwloadFileElement.style = 'display: none';
      donwloadFileElement.href = fileURL;
      donwloadFileElement.download = fileName;
      donwloadFileElement.click();
      window.URL.revokeObjectURL(fileURL);
      donwloadFileElement.remove();
    }
  });
};

export default downloadFile;