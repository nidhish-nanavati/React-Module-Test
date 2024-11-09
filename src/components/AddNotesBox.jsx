import React, { useEffect, useState } from 'react'
import send_image from '../assets/send.png'

const AddNotesBox = ({selectedNote}) => {

    const [note,setNote] = useState('');
    const [noteList,setNoteList] = useState([{}]); 
    
    const handleChange = (e) => {
    setNote(e.target.value); 
  };

  useEffect(() => {
    if(localStorage.getItem(selectedNote)){
      setNoteList(JSON.parse(localStorage.getItem(selectedNote)));
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
    if(!localStorage.getItem(selectedNote))
      localStorage.setItem(selectedNote,JSON.stringify([{ id: noteList.length + 1, noteData : note, date : date, time : time}]))
    else
      localStorage.setItem(selectedNote,JSON.stringify([...JSON.parse(localStorage.getItem(selectedNote)),{ id: noteList.length + 1, noteData : note, date : date, time : time}]));
  }
  return (
    <div className='notesBox'>
      <div>
        <span className='notes-initial'>{selectedNote.split(' ')[0][0].toUpperCase()}{selectedNote.split(' ')[1][0].toUpperCase()}</span> &nbsp;
        <span className='notes-name'>{selectedNote}</span>
      </div>
      {
        noteList.map((item) => (
          <div key ={item.id} className='note-data'>
            <span>{item.noteData}</span>
            <span>{item.date}</span>
            <span>.</span>
            <span>{item.time}</span>
          </div>
        ))
      }
      <div className='addNotesBox'>
        <textarea
        value={note}
          onChange={handleChange}
          rows="5"  // Set number of rows
          cols="50" // Set number of columns
          placeholder="Enter your text here..."
        />
      <button
        style={{
          backgroundImage: `url(${send_image})`,
          backgroundSize: 'cover',
          width: '20px',
          height: '20px',
          border: 'none',
          cursor: 'pointer',
          filter: !note ? 'grayscale(100%)' : 'none',
        }}
        onClick={() => addNewNote(note)} // You can replace this with your form submission logic
        disabled={!note} // Disable the button if textarea is empty
      />      </div>
    </div>
  )
}

export default AddNotesBox
