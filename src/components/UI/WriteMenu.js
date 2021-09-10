import { Fragment, useState } from "react";
import ReactDOM from 'react-dom';

import ColorMenu from './ColorMenu';
import colorClasses from './ColorMenu.module.css'
import classes from './WriteMenu.module.css';



const Backdrop = () => {
    return <div className={classes.backdrop}></div>
}

const NoteOverlay = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [colorName, setColorName] = useState(colorClasses.white);
    
    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };
    const messageChangeHandler = (event) => {
        setEnteredMessage(event.target.value);
    };
    const setColorHandler = (newColor) => {
        setColorName(newColor);
    };
    let disabled = !(enteredTitle.length > 0 && enteredMessage.length > 0);
    let op = 0.5;
    if(!disabled){
        op = 1;

    }
    
    const submitHandler = (event) => {
        event.preventDefault();
        
        const noteData = {
            title: enteredTitle,
            message: enteredMessage,
            color: colorName
        };
        props.onCreateNote(noteData);
        setEnteredTitle('');
        setEnteredMessage('');
    }
    const closeHandler = (event) => {
        event.preventDefault();
        props.onClose();
    } 
    return (
    <div className={classes.modal}>
        <form onSubmit={submitHandler} className={classes.content}>
            <h3>Create Note</h3>
            <label>Title</label><br/>
            <input type='text' 
                 value={enteredTitle} 
                 onChange={titleChangeHandler}/><br/>
            <label>Note</label><br/>
            <textarea rows='4'
            value={enteredMessage} 
            onChange={messageChangeHandler}></textarea>
            <ColorMenu onColorChange={setColorHandler}/>
            <button type="submit" disabled={disabled} style={{opacity: op}}>Submit</button>
            <button onClick={closeHandler}>Close</button>
        </form>
    </div>
    );
};


const portalElement = document.getElementById('overlays');

const WriteMenu = props => {
    
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop  />, portalElement)}
        {ReactDOM.createPortal(<NoteOverlay 
        onCreateNote={props.onCreateNote}
        onClose={props.onClose}>{props.children}</NoteOverlay>,
        portalElement)}
    </Fragment>
};

export default WriteMenu;