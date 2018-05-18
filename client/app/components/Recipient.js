import React from 'react';
import { FormControl } from 'react-bootstrap';

const Recipient = (props) => {
return (
  <div className="message-recipient"> 
    <FormControl type="number" className="to" value={props.value} placeholder="Number 1, Number 2, etc" onChange={(e)=>props.handleChange(e,'recipient')} />
  </div>)};

export default Recipient;


// old component code for reference
// <input type="text" name="to" className="to" value={props.value} onChange={(e)=>props.handleChange(e,'recipient')} placeholder="e.g., 415-123-1234"/>
