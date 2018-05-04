import React from 'react';

const Body = (props) => 
<div className="message-body">
    <textarea name="body" className="body" value={props.value} onChange={(e)=>props.handleChange(e,'body') } placeholder="Enter your message here" />
</div>

export default Body;