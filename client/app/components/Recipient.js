import React from 'react';

const Recipient = (props) => {
return (<div> 
  <label>
    Number:
    <input type="text" name="to" className="to" value={props.value} onChange={(e)=>props.handleChange(e,'recipient')}/>
  </label>
</div>)};

export default Recipient;