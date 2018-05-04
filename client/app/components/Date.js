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
             <DatePicker onChange={this.onChange} value={this.state.date} />
            </div>)
  }
  
}

export default DatePickerModule;