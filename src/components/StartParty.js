import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const StartParty = (props) => {
  var partyCodeInput =""
  const query = (input) => {
    partyCodeInput = (input.target.value);
  }

  const clickHandler = () => {
    props.joinAsGuest(partyCodeInput);
  }

  return (
    <div>
        <a href="/hostLogin">
        <div className="startPartyBoxes">
          <button className="startPartyTitles">Host a Party</button>
        </div>
        </a>
        <div className="startPartyBoxes">
          <input onChange= {(input) => query(input)} type="text"/>
          <button className="startPartyTitles" onClick={clickHandler}>Join A Party</button>
        </div>
    </div>
  )
}


export default StartParty;
          // <form onSubmit={props.join}>
          // <span className="startPartyTitles" onClick={(e)=> {props.joinAsGuest(e)}}>Join A Party</span>
          //   <label htmlFor="partyCode" className="partyCodeText">Party Code:</label>
          //   <input id="partyCode" type="partyCode" name="partyCode"/>
          // </form>