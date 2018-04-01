import React from 'react';

const DatePicker = (props) => {

$( function() {
    $( "#datepicker" ).datepicker();
  } );

  return (<div>
           Date: <input type="text" id="datepicker" />
          </div>)
  
}

export default DatePicker;