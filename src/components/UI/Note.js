import React, { useState } from 'react';

import ChoiceMenu from "./ChoiceMenu";
import classes from "./Note.module.css";

const Note = (props) => {
    const [visible, setVisible] = useState(false);
    const deleteNoteHandler = () => {
        props.onRemoveNote(props.iden);
    };
    const toggleEditHandler = () => {
        props.onEditToggle(props.iden);
    };
    const turnOnVisibleHandler = () => {
        setVisible(true);
    }
    const turnOffVisibleHandler = () => {
        setVisible(false);
    }
    return (
        <div onMouseOver={turnOnVisibleHandler} onMouseLeave={turnOffVisibleHandler} className={classes.noteContainer}>
            {visible && <ChoiceMenu onDeleteNote={deleteNoteHandler} 
                        onEditToggle={toggleEditHandler}/>}
            <div className={`${classes.note} ${props.color}`}>
                <h4>{props.title}</h4>
                <span> ({props.date})</span>
                <p>{props.message}</p>
            </div>
        </div>
        
    );
}

export default Note;