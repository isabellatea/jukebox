import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import FlatButton from 'material-ui/FlatButton';

const StartParty = (props) => {

  return (

      <div>
        <div className="hostPartyButton">
          <a href="/hostLogin">Host a Party</a>
        </div>

        <div className="joinPartyButton">
          <form onSubmit={props.join}>
            <label htmlFor="partyCode">Enter Your Party Code:</label>
            <input id="partyCode" type="partyCode" name="partyCode"/>
            <button onClick={props.joinAsGuest}>Join Now!</button>
          </form>
        </div>
      </div>


  )
}

export default StartParty;