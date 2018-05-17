import React from 'react';
import ReactDom from 'react-dom';
import Recipient from './components/Recipient';
import Body from './components/Body';
import axios from 'axios';
import moment from 'moment';
import { Button,FormControl } from 'react-bootstrap';
import Trigger from './components/Trigger';
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
      currentTime: new Date(),
      showConfirmation: false
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
    this.setState({date: dateAndTime})

    axios.post('/send',{
      to: this.state.recipient,
      body: this.state.body,
      date: dateAndTime.toDate()
    })
    .then((res)=> {
      console.log(res);
      this.setState({showConfirmation: true})
      console.log('sent!');
    }
    );
  }

  hideModal(){
    this.setState({showConfirmation:false});
  }


  render() {

    return (<div className="container">
              <Clock value={this.state.currentTime}/>
              <h1>Text Message Scheduler</h1>
              <h3>Remind yourself with a text!</h3>
              <div className="messanger">
                <form className="form">
                  <label> Recipient </label>
                  <Recipient handleChange={this.handleChange.bind(this)} value={this.state.recipient}/>
                  <label>  Body </label>
                  <Body handleChange={this.handleChange.bind(this)} value={this.state.body}/>
                  <div className="date-and-time">
                    <div className="date-picker-box">
                      <label>  Date </label>
                      <DatePicker className="date-picker" selected={this.state.date} onChange={(e)=>this.handleChange(e, 'date')} />
                    </div>
                    <div className="date-picker-box">
                      <label>  Time </label>
                      <TimePicker use12Hours showSecond={false} defaultValue={moment()} className="xxx" onChange={(e)=>this.handleChange(e, 'time')}/>
                   </div>
                  </div>
                  <Button className="button" bsStyle="primary" onClick={this.scheduleMessage.bind(this)} >Remind Me!</Button>
                </form>
              </div>
              <Trigger show={this.state.showConfirmation} date={this.state.date} hide={this.hideModal.bind(this)} />
            </div>);
  }
};

ReactDom.render(<App/>, document.getElementById('app'));
