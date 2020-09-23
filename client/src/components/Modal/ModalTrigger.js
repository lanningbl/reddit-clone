import React from 'react';

const ModalTrigger = (props) => {
  return (
    <div
      ref={props.triggerButtonRef}
      onClick={props.showModal}
      className={props.triggerStyle || 'primary'}
    >
      {props.triggerText}
    </div>
  );
};

export default ModalTrigger;
