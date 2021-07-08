const closePersonalPopup = () => {
  document.querySelector('.modal.show').style = '';
  document.querySelector('.modal.show').classList.remove('show');
  document.querySelector('.modal-backdrop').remove();
};

export default closePersonalPopup;