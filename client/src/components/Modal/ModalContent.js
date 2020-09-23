import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';

const ModalContent = (props) => {
  return ReactDOM.createPortal(
    <FocusTrap>
      <aside
        className='modal-wrapper'
        tag='aside'
        role='dialog'
        aria-modal='true'
        onClick={props.onClickOutside}
        onKeyDown={props.onKeyDown}
      >
        <div className={`modal-box ${props.modalStyle}`} ref={props.modalRef}>
          {props.close && (
            <button
              aria-labelledby='close-button'
              className='close-modal-btn'
              onClick={props.closeModal}
            />
          )}
          {props.modalContent}
        </div>
      </aside>
    </FocusTrap>,
    document.body
  );
};

export default ModalContent;
