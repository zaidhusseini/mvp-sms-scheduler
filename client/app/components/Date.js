import React, { Component } from 'react';
import DatePicker from 'react-date-picker';

class DatePickerModule extends Component {
  
  constructor(){
    super();
    this.state = {
      date: new Date(),
    }
    
  }

  onChange(date){
    this.setState({ date })
  }

  render(){
    return (<div>
             <DatePicker type="date" popperPlacement="top-end" onChange={this.onChange} value={this.state.date} />
              <input type="date"/>
            </div>)
  }
  
}

export default DatePickerModule;