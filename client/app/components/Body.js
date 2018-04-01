import React from 'react';

const Body = (props) => 
<div>
  <label>
    Body:
    <input type="text" name="body" className="body" value={props.value} onChange={(e)=>props.handleChange(e,'body')} />
  </label>
</div>

export default Body;