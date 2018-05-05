import React from 'react';
import ReactDom from 'react-dom';
import Recipient from './components/Recipient';
import Body from './components/Body';
import axios from 'axios';
import moment from 'moment';
// import DatePicker from 'react-date-picker';
import Clock from 'react-clock';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      recipient: '',
      body: '',
      date: moment(),
      time: moment(),
      currentTime: new Date()
    }
  }

  componentDidMount(){
    setInterval(()=>this.setState({currentTime: new Date()}),1000);
  }

  handleChange(e, field){
    
    const fieldSelector = {
      recipient: ()=> this.setState({recipient: e.target.value}),
      body: ()=> this.setState({body: e.target.value}),
      date: ()=> this.setState({date: e}),
      time: ()=> this.setState({time: e})
    }

    fieldSelector[field](); //set value of text field
    console.log(e);
  }

  scheduleMessage(e){
    e.preventDefault(); //prevent screen refresh

    console.log(this.state.recipient);

    let dateString = this.state.date.format('MM-DD-YYYY');
    let timeString = this.state.time.format('HH:mm');
    let dateAndTime = moment(dateString + ' ' + timeString, "MM-DD-YYYY HH:mm");

    console.log('scheduling ', dateAndTime.toDate());
   
    axios.post('/send',{
      to: this.state.recipient,
      body: this.state.body,
      date: dateAndTime.toDate()
    })
    .then((res)=> console.log(res));
  }

  render() {

    return (<div className="container">
              <Clock value={this.state.currentTime}/>
              <h1>Text Message Scheduler</h1>
              <h3>Remind yourself with a text!</h3>
              <div className="messanger">
                <form className="form">
                  <h6> Recipient </h6>
                  <Recipient handleChange={this.handleChange.bind(this)} value={this.state.recipient}/>
                  <h6>  Body </h6>
                  <Body handleChange={this.handleChange.bind(this)} value={this.state.body}/>
                  <h6>  Date </h6>
                  <DatePicker selected={this.state.date} onChange={(e)=>this.handleChange(e, 'date')} />
                  <h6>  Time </h6>
                  <TimePicker use12Hours showSecond={false} defaultValue={moment()} className="xxx" onChange={(e)=>this.handleChange(e, 'time')}/>
                  <input type="submit" className="send" value="Remind Me!" onClick={this.scheduleMessage.bind(this)} />
                </form>
              </div>
            </div>);
  }
};

ReactDom.render(<App/>, document.getElementById('app'));
