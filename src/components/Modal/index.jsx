import React from 'react';
import classNames from 'classnames';

const Modal = ({ id, scrollable, size, title, footer, children }) => {
  const modalDialogClasses = classNames({
    'modal-dialog modal-dialog-centered': true,
    'modal-dialog-scrollable': scrollable,
    'modal-xl': size === 'xl',
    'modal-lg': size === 'lg',
    'modal-md': size === 'md',
    'modal-sm': size === 'sm'
  });

  return (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={id} aria-hidden="true">
      <div className={modalDialogClasses} role="document">
        <form className="form modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            {footer}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;