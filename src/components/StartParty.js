import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const StartParty = (props) => {

  return (
    <div>
      <div className="startPartyWelcome">
      </div>
      <div className="startPartyBoxesContainer">
        <a href="/hostLogin">
        <div className="startPartyBoxes">
          <span className="startPartyTitles">Host a Party</span>
        </div>
        </a>
        <div className="startPartyBoxes">
          <form onSubmit={props.join}>
          <span className="startPartyTitles" onClick={props.joinAsGuest}>Join A Party</span>
            <label htmlFor="partyCode" className="partyCodeText">Party Code:</label>
            <input id="partyCode" type="partyCode" name="partyCode"/>
          </form>
        </div>
      </div>
    </div>
  )
}


export default StartParty;