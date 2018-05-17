import React from 'react';
import { FormControl } from 'react-bootstrap';

const Body = (props) => 
<div className="message-body">
    <FormControl componentClass="textarea" className="body" placeholder="Enter your message here" value={props.value} onChange={(e)=>props.handleChange(e,'body')}/>
</div>

export default Body;