import React, { useState } from 'react';

import colorClasses from "./ColorMenu.module.css";

const ColorMenu = (props) => {

    const [colorName, setColorName] = useState(colorClasses.white);

    const setColorHandler = (event) =>{
        props.onColorChange(event.target.classList[1]);
        setColorName(event.target.classList[1]);
    } 

    return (
    <div className={colorClasses.colorMenu}>
        <span>Select Color: </span>
        <div className={`${colorClasses.colorSquare} ${colorClasses.pink}`} onClick={setColorHandler}></div>
        <div className={`${colorClasses.colorSquare} ${colorClasses.magenta}`} onClick={setColorHandler}></div>
        <div className={`${colorClasses.colorSquare} ${colorClasses.orange}`} onClick={setColorHandler}></div>
        <div className={`${colorClasses.colorSquare} ${colorClasses.yellow}`} onClick={setColorHandler}></div>
        <div className={`${colorClasses.colorSquare} ${colorClasses.limeGreen}`} onClick={setColorHandler}></div>
        <div className={`${colorClasses.colorSquare} ${colorClasses.lightBlue}`} onClick={setColorHandler}></div>
        <div className={`${colorClasses.colorSquare} ${colorClasses.lightPurple}`} onClick={setColorHandler}></div>
        <div className={`${colorClasses.colorSquare} ${colorClasses.white}`} onClick={setColorHandler}></div>
        <div className={`${colorClasses.colorSquare} ${colorClasses.beige}`} onClick={setColorHandler}></div><br/>
        <p>Current Color: </p>
        <div className={`${colorClasses.currentColor} ${colorName}`} ></div>
    </div>
    );
}

export default ColorMenu;