import React from 'react';
import ReactDom from 'react-dom';
import Recipient from './components/Recipient';
import Body from './components/Body';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import Clock from 'react-clock';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      recipient: '',
      body: '',
      date: new Date(),
      time: new Date(),
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
      date: ()=> this.setState({date: e})
    }

    fieldSelector[field](); //set value of text field
    console.log(this.state.recipient);

  }

  scheduleMessage(e){
    e.preventDefault(); //prevent screen refresh

    console.log(this.state.recipient)

    axios.post('/send',{
      to: this.state.recipient,
      body: this.state.body,
      date: Date.now()
    })
    .then((res)=> console.log(res));
  }

  render() {

    return (<div className="container">
              <Clock value={this.state.currentTime}/>
              <div className="messanger">
                <form className="form">
                  <h4>Text Message Scheduler</h4>
                  <h6> Recipient </h6>
                  <Recipient handleChange={this.handleChange.bind(this)} value={this.state.recipient}/>
                  <h6> Message Body </h6>
                  <Body handleChange={this.handleChange.bind(this)} value={this.state.body}/>
                  <h6> Send Date </h6>
                  <DatePicker onChange={(e)=>this.handleChange(e, 'date')} value={this.state.date}/>
                  <input type="submit" className="send" value="submit" onClick={this.scheduleMessage.bind(this)} />
                </form>
              </div>
            </div>);
  }
};

ReactDom.render(<App/>, document.getElementById('app'));
