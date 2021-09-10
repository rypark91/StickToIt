import classes from "./ChoiceMenu.module.css";

const ChoiceMenu = (props) => {


    const deleteHandler = (event) =>{
        props.onDeleteNote();
        
    }
    const toggleEditHandler = () =>{
        props.onEditToggle();
    }

    return (
        <div className={classes.editMenu}>
            <span onClick={toggleEditHandler}>Edit</span>
            <span onClick={deleteHandler}>Delete</span>
        </div>
    );
}

export default ChoiceMenu;