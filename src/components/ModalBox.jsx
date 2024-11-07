import React, { useRef,useEffect } from 'react'
import './ModalBox.css'

const ModalBox = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);

  // Close modal if clicked outside the modal content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
    // Clean up event listener on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);    
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  const createNodeGroup = () => {

  }

  return (
    <div className='model-overlay'>
      <div className='modalBox' ref={modalRef}>
          <div>Create New app</div>
          <div>Group Name<input type='text' placeholder='Enter group name'/></div>
          <div>Choose color</div>
          <div><button onClick={createNodeGroup}>Create</button></div>
      </div>
    </div>
    )
}

export default ModalBox
