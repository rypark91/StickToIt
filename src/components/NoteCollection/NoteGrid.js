import React from 'react';

import Note from '../UI/Note';
import classes from './NoteGrid.module.css';
import '../UI/ColorMenu.module.css';

const NoteGrid = (props) => {
  
  const removeNoteHander = (id) => {
    props.onRemove(id);
  }
  const toggleEditHandler = (id) => {
    props.onEditToggle(id);
  }
  
  return (
    <div className={classes.GridContainer}>
      {props.notes.map((note) => (
        <Note key={note.id} 
        iden={note.id}
        onRemoveNote={removeNoteHander}
        onEditToggle={toggleEditHandler}
        color={note.color}
        title={note.title}
        message={note.message}
        date={note.date}/>
      ))}

    </div>
  );
};

export default NoteGrid;