import React from 'react';

const Hystmodal = ({ id, title, footer, children }) => {
  return (
    <div className="hystmodal" id={id} aria-hidden="true">
      <div className="hystmodal__wrap">
        <div className="hystmodal__window" role="dialog" aria-modal="true">
          <div className="popup">
            <div className="popup__header">
              <h2 className="popup__heading">{title}</h2><svg className="popup__close svg" data-hystclose="">
                <use xlinkHref="/img/svgSprite.svg#icon__cross"></use>
              </svg>
            </div>
            <div className="popup__body">
              {children}
            </div>
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hystmodal;