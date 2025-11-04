import React from 'react';
import './modal.sass'

const CustomModal = ({ isOpen, onClose, children }) => {
  if(isOpen){
    return (
      <div className='modal' onClick={onClose}>
        <div className='body' onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
      </div>
    );
  }
}
export default CustomModal