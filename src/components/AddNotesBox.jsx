import React, { useEffect, useState } from 'react'
import send_image from '../assets/send.png'
import dot_image from '../assets/dot.png'
import './AddNotesBox.css'
import back_button from '../assets/back.png'

const AddNotesBox = ({selectedNote, overlay,overlayValue }) => {

    const [note,setNote] = useState('');
    const [noteList,setNoteList] = useState([{}]);

    const handleChange = (e) => {
    setNote(e.target.value); 
  };

  console.log(noteList);

  useEffect(() => {
    console.log(selectedNote.noteGroup);
    if(localStorage.getItem(selectedNote.noteGroup)){
      setNoteList(JSON.parse(localStorage.getItem(selectedNote.noteGroup)));
    }
    else{
      setNoteList([]);
    }
  }
  ,[selectedNote]);

  const addNewNote = (note) => {
    console.log(note);

    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'short' });
    const year = now.getFullYear();
    const date = `${day} ${month} ${year}`;
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const noteObject = { id: noteList.length + 1, noteData : note, date : date, time : time};
    setNoteList(prev => [...prev,noteObject]);
    if(!localStorage.getItem(selectedNote.noteGroup))
      localStorage.setItem(selectedNote.noteGroup,JSON.stringify([{ id: noteList.length + 1, noteData : note, date : date, time : time}]))
    else
      localStorage.setItem(selectedNote.noteGroup,JSON.stringify([...JSON.parse(localStorage.getItem(selectedNote.noteGroup)),{ id: noteList.length + 1, noteData : note, date : date, time : time}]));
  }

  const handleOverlayClose = () => {
    overlayValue(false);
  }
  const nonOverlayStyle = {
    height: '100vh',
    position: 'relative'
  };

  const overlayStyle ={
    position: 'fixed',
    top: '0',
    left: '0',
    minWidth: '100%',
    maxWidth: '100%',
    zIndex : '1000',
    opacity: '1',
    backgroundColor:'#DCE7F7'
  };
  return (
    <div style={overlay ? overlayStyle : nonOverlayStyle} className='notesBox'>
      <div className='notesTitle'>
        {overlay && (<div onClick={handleOverlayClose} className='backButton' style={{
          background: 'transparent',
          display:'flex',
          alignItems:'center'
        }} ><img src={back_button} height='20px' width='20px'/></div>)}
        <span className='notesInitial' style={{
          backgroundColor : `${selectedNote.color}`,
          borderRadius: '50%'
        }}>{selectedNote.noteGroup.split(' ')[0][0].toUpperCase()}{selectedNote.noteGroup.split(' ')[1][0].toUpperCase()}</span> &nbsp;
        <span className='notesName'>{selectedNote.noteGroup}</span>
      </div>
      <div className='notesListContainer'>
      {
        noteList.map((item) => (
          <div key ={item.id} className='noteData'>
            <div className='noteName'>{item.noteData}</div>
            <div className='noteTime'>{item.date}&nbsp;&nbsp;<img src={dot_image} style={{transform:'scale(0.7)'}}/>&nbsp;&nbsp;{item.time}</div>
          </div>
        ))
      }
      </div>
      <div className='addNotesBox'>
          <textarea className='addNotesTextArea'
          value={note}
            onChange={handleChange}
            rows="5"  // Set number of rows
            cols="50" // Set number of columns
            placeholder="Enter your text here..."
          />
        <button className='addNotesButton'
          style={{
            backgroundImage: `url(${send_image})`,
            backgroundColor: 'white',
            backgroundSize: 'cover',
            width: '20px',
            height: '20px',
            border: 'none',
            cursor: note ? 'pointer' : 'not-allowed',
            filter: !note ? 'grayscale(100%)' : 'none',
          }}
          onClick={() => addNewNote(note)} // You can replace this with your form submission logic
          disabled={!note} // Disable the button if textarea is empty
        />
      </div>
    </div>
  )
}

export default AddNotesBox
