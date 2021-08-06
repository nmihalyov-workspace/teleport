import { api_query } from '../api';

const deleteFile = (data, callback) => {
  data.delete = 1;

  api_query.post('/user/download_document', data)
  .then(res => {
    if (res.data.success) {
      callback();
    }
  });
};

export default deleteFile;