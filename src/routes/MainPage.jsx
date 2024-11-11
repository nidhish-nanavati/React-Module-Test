import React, { useEffect } from 'react'
import styles from './MainPage.module.css'
import notes_image from '../assets/notes-taking-image.png'
import lock_image from '../assets/lock.png'
import plus_sign from '../assets/plus.png'
import ModalBox from '../components/ModalBox'
import { useState } from 'react'
import AddNotesBox from '../components/AddNotesBox'

const MainPage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notesData,setNotesData] = useState([]);
    const [isNoteSelected, setIsNoteSelected] = useState(false);
    const [selectedNote,setSelectedNote] = useState('');
    const[overlay,setOverlay] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    useEffect(() => {
        if(localStorage.getItem('noteLabelList')){
            setNotesData(JSON.parse(localStorage.getItem('noteLabelList')));
        }
    },[])


    const handleDetails = (data) =>{
            console.log(notesData);
            setNotesData( prev => [...prev,data]);
            if(!localStorage.getItem('noteLabelList')){
                console.log(localStorage.getItem('noteLabelList'));
                localStorage.setItem('noteLabelList',JSON.stringify([data]));                
            }
            else{
                console.log(localStorage.getItem('noteLabelList'));
                localStorage.setItem('noteLabelList',JSON.stringify([...JSON.parse(localStorage.getItem('noteLabelList')),data]));
            }
        }

    const openNotesData = (item) => {
        setIsNoteSelected(true);
        console.log(isNoteSelected);
        setSelectedNote(item);
        console.log(selectedNote);
        console.log(window.innerWidth);
        if (window.innerWidth < 1024) {
            setOverlay(true);
            console.log(overlay);
        }        
    }

    const handleOverlayValue = (overlayValue) => {
        setOverlay(false);
    }
  return (
    <>
    <div className={`${styles.mainContainer} ${isModalOpen ? styles.blur : ''}`}>
        <div className={styles.notesListContainer}>
            <div className={styles.pocketNotes}>Pocket Notes</div>
            <div className={styles.notesList} title="" aria-label="">  
                {notesData.map((item,index) => (
                    <div key={index} onClick={()=>openNotesData(item)} className={styles.noteListItem}>
                        <div className={styles.notesInitial} style={{
                            backgroundColor: `${item.color}`,
                        }}>{item.noteGroup.split(' ')[0][0].toUpperCase()}{item.noteGroup.split(' ')[1][0].toUpperCase()}</div> &nbsp;
                        <div className={styles.notesName}>{item.noteGroup}</div>
                    </div>
                ))}
            </div>
            <div className={styles.addButton}>
                <img src={plus_sign} alt ='plus' onClick={openModal}/>
            </div>
            
        </div>
        {!isNoteSelected && (
        <div className={styles.notesDisplayContainer}>
            <div className={styles.notesImage}>
                <img src={notes_image} alt='Taking notes'/>
            </div>
            <div className={styles.pocketNotesTitle}>
                Pocket Notes
            </div>
            <div className={styles.pocketNotesDescription}>
                Send and receive messages without keeping your phone online.<br/>
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </div>
            <div className={styles.encryption}>
                <img src={lock_image} style={{
                    height : '15px',
                    width: '12px'
                }} />&nbsp;
                <span className={styles.encryptionText}>end-to-end encrypted</span>
            </div>
        </div>
        )}
        {isNoteSelected && (
            <div className={styles.notesDisplayContainer}>
                <AddNotesBox selectedNote={selectedNote} overlay={overlay} overlayValue={handleOverlayValue}/>
            </div>
        )}
    </div>
    {isModalOpen && (<ModalBox isOpen={isModalOpen} onClose={closeModal} addDetails={handleDetails}/>)} 
    </>
  )
}

export default MainPage
