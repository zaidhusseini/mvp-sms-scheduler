import React from 'react';

const Recipient = (props) => {
return (<div className="message-recipient"> 
    <input type="text" name="to" className="to" value={props.value} onChange={(e)=>props.handleChange(e,'recipient')} placeholder="e.g., 415-123-1234"/>
</div>)};

export default Recipient;