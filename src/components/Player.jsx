import { useState } from "react";

export default function Player({name,sympol,isActive,onChangeName}){
    const [isEditing,setisEditing]=useState(false);
    const [playerName,setPlayerName]=useState(name);
    function buttonHandler(){
        setisEditing((editing)=>!editing);
        if(isEditing){
        onChangeName(sympol,playerName);
        }
    }
    function handleChange(event){
        setPlayerName((playerName)=>(event.target.value));
    }
    let editablePlayerName=<span className="player-name"> {playerName}</span>;
    let buttonCaption="Edit";
    if(isEditing){
        editablePlayerName=<input type="text" defaultValue={playerName} onChange={handleChange} required/>;
        buttonCaption="Save";
    }
    
    return(
        <li className={isActive?'active':undefined}>
            <span className="player">
            {editablePlayerName}
            <span className="player-sympol"> {sympol}</span>
            </span>
            
            <button onClick={()=>buttonHandler()}>{buttonCaption}</button>
        </li>
    );
}