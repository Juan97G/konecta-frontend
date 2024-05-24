import React from 'react';
import { Modal } from "semantic-ui-react";

const CustomModal = ({ children, open, size, onClose }) => {

  return (
    <Modal
      dimmer="blurring"
      size={size}
      open={open}
      onClose={onClose}
    >
      { children }
    </Modal>
  );
};

export default CustomModal;
