import React, { useEffect, useState } from 'react'
import send_image from '../assets/send.png'
import dot_image from '../assets/dot.png'
import './AddNotesBox.css'

const AddNotesBox = ({selectedNote}) => {

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
  return (
    <div className='notesBox'>
      <div className='notesTitle'>
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
            <div className='noteTime'>{item.date}&nbsp;&nbsp;<img src={dot_image}/>&nbsp;&nbsp;{item.time}</div>
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
