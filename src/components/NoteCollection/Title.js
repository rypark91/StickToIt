// import React, { useState } from 'react';

import classes from "./Title.module.css";

const Title = (props) => {;

    const createNoteHandler = (event) => {
        event.preventDefault();
        props.onToggleMenu();
    };

    return (
        <div className={classes.titleLine}>
            <h1>Stick to It
                <button onClick={createNoteHandler}>+ Create</button></h1>
            <p>(By Ryan Park &copy; 2021)</p>
        </div>
    );
}

export default Title;