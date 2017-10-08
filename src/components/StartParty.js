import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';

const StartParty = (props) => {

  return (
    <div>
      <a href="/hostLogin">Host a Party</a>

      <form onSubmit={props.join}>
        <label htmlFor="partyCode">Enter Your Party Code:</label>
        <input id="partyCode" type="partyCode" name="partyCode"/>
        <FlatButton onClick={props.joinAsGuest} label="Join Now!"/>
      </form>

    </div>
  )
}

export default StartParty;