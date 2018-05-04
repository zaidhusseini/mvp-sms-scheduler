import React from 'react';

const Recipient = (props) => {
return (<div className="message-recipient"> 
    <input type="text" name="to" className="to" value={props.value} onChange={(e)=>props.handleChange(e,'recipient')} placeholder="Enter your phone-number here"/>
</div>)};

export default Recipient;