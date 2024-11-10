import React, { useRef,useEffect, useState } from 'react'
import './ModalBox.css'

const ModalBox = ({ isOpen, onClose,addDetails }) => {
    const modalRef = useRef(null);
    const [groupName,setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#ffffff');

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
    <div className='modelOverlay'>
      <div className='modalBox' ref={modalRef}>
          <div className='modalBoxCreateText'>Create New app</div>
          <div className='modalBoxGroupNameText'>Group Name<input type='text' placeholder='Enter group name' onChange={(e)=>setGroupName(e.target.value)} /></div>
          <div className='modalBoxColor'><div className='modalBoxColorText'>Choose color</div>
          <div style={{
        display: 'grid', 
        gridTemplateColumns: 'repeat(6, 30px)',  // 6 columns for the color swatches
        gap: '5px', 
        justifyContent: 'center',
      }}>
          {colors.map((color, index) => (
          <div
            key={index} 
            onClick={() => handleColorSelect(color)} 
            style={{
              width: '20px', 
              height: '20px', 
              backgroundColor: color, 
              borderRadius: '50%', // Square corners with rounded edges
              cursor: 'pointer', 
              marginTop:'10px',
              border: selectedColor === color ? '3px solid black' : '3px solid transparent'
            }}
          />
        ))}      
        </div>                
          </div>
          <div className='createButton' ><button onClick={createNoteGroup}>Create</button></div>
      </div>
    </div>
    )
}

export default ModalBox
