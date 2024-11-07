import React from 'react'
import styles from './MainPage.module.css'
import notes_image from '../assets/notes-taking-image.png'
import lock_image from '../assets/lock.png'
import plus_sign from '../assets/plus.png'
import ModalBox from '../components/ModalBox'
import { useState } from 'react'

const MainPage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notesData,setNotesData] = useState({});

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const handleAddNodeGroup = (data) =>{
        setNotesData((prev) => ({
            ...prev,
            [data] : []
        }));
    }
  return (
    <>
    <div className={`${styles.mainContainer} ${isModalOpen ? styles.blur : ''}`}>
        <div className={styles.notesListContainer}>
            <div className={styles.pocketNotes}>Pocket Notes</div>
            <div className={styles.addButton}>
                <img src={plus_sign} alt ='plus' onClick={openModal}/>
            </div>
        </div>

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
                <img src={lock_image}></img>
                <span className={styles.encryptionText}>end-to-end encrypted</span>
            </div>
        </div>
    </div>
    {isModalOpen && (<ModalBox isOpen={isModalOpen} onClose={closeModal} addNodeGroup={handleAddNodeGroup}/>)}
    </>
  )
}

export default MainPage
