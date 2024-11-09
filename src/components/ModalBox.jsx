import React, { useRef,useEffect, useState } from 'react'
import './ModalBox.css'
import { useSearchParams } from 'react-router-dom';

const ModalBox = ({ isOpen, onClose,addDetails }) => {
    const modalRef = useRef(null);
    const [groupName,setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#000000');

      // Array of fixed colors for the picker
  const colors = [
    "#B38BFA", "#FF79F2", "#43E6FC" , "#F19576", "#0047FF", "#6691FF"
  ];

    // Handle color selection from the fixed colors palette
    const handleColorSelect = (color) => {
      setSelectedColor(color); // Update the selected color
      console.log(color);
    };

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
  
  const createNoteGroup = () => {
    addDetails({noteGroup : groupName,color : selectedColor});
    onClose(); 
  }

  return (
    <div className='model-overlay'>
      <div className='modalBox' ref={modalRef}>
          <div>Create New app</div>
          <div>Group Name<input type='text' placeholder='Enter group name' onChange={(e)=>setGroupName(e.target.value)} /></div>
          <div>Choose color
          <div style={{
        display: 'grid', 
        gridTemplateColumns: 'repeat(6, 60px)',  // 6 columns for the color swatches
        gap: '10px', 
        justifyContent: 'center',
      }}>
          {colors.map((color, index) => (
          <div
            key={index} 
            onClick={() => handleColorSelect(color)} 
            style={{
              width: '30px', 
              height: '30px', 
              backgroundColor: color, 
              borderRadius: '50%', // Square corners with rounded edges
              cursor: 'pointer', 
            }}
          />
        ))}      
        </div>                
          </div>
          <div><button onClick={createNoteGroup}>Create</button></div>
      </div>
    </div>
    )
}

export default ModalBox
