import React from 'react';
import './modal.sass'
import { IoMdCloseCircle } from "react-icons/io";

const CustomModal = ({ isOpen, onClose, children }) => {
  if(isOpen){
    return (
      <div className='modal' onClick={onClose}> {/* so when they click outside of the modal it gets closed */}
        <div className='body' onClick={(e) => e.stopPropagation()}>
            <div id='x-btn' onClick={onClose}><IoMdCloseCircle size={25}/></div>
            <div className='content-modal'>
             {children}
            </div>
        </div>
      </div>
    );
  }
}
export default CustomModal