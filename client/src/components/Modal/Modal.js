import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';
import ModalContent from './ModalContent';
import ModalTrigger from './ModalTrigger';

const Modal = ({
  triggerText = 'DEFAULT',
  modalContent,
  triggerStyle,
  modalStyle,
  close,
}) => {
  const [isShown, setIsShown] = useState(false);
  const triggerButtonRef = useRef(null);
  const modalRef = useRef(null);

  const showModal = () => {
    setIsShown(true);
    toggleScrollLock();
  };

  const closeModal = () => {
    setIsShown(false);
    triggerButtonRef.current.focus();
    toggleScrollLock();
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  const onClickOutside = (event) => {
    if (modalRef && modalRef.current.contains(event.target)) return;
    closeModal();
  };

  const toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  return (
    <React.Fragment>
      <ModalTrigger
        triggerButtonRef={triggerButtonRef}
        triggerText={triggerText}
        triggerStyle={triggerStyle}
        showModal={showModal}
      />
      {isShown ? (
        <ModalContent
          modalRef={modalRef}
          modalContent={modalContent}
          modalStyle={modalStyle}
          close={close}
          closeModal={closeModal}
          onKeyDown={onKeyDown}
          onClickOutside={onClickOutside}
        />
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  );
};

export default Modal;

Modal.propTypes = {
  triggerText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  modalContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  triggerStyle: PropTypes.string,
  modalStyle: PropTypes.string,
  close: PropTypes.bool,
};
