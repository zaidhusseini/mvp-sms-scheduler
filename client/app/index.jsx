import React from 'react';
import ReactDom from 'react-dom';
import Recipient from './components/Recipient';
import Body from './components/Body';
import DatePicker from './components/Date'
import axios from 'axios';
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recipient: '',
      body: ''
    }
  }

  handleChange(e, field){

    const fieldSelector = {
      recipient: ()=> this.setState({recipient: e.target.value}),
      body: ()=> this.setState({body: e.target.value})
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

    return (<div>
              <form>
                <Recipient handleChange={this.handleChange.bind(this)} value={this.state.recipient}/>
                <Body handleChange={this.handleChange.bind(this)} value={this.state.body}/>
                <DatePicker />
                <input type="submit" value="submit" onClick={this.scheduleMessage.bind(this)} />
              </form>
            </div>);
  }
};

ReactDom.render(<App/>, document.getElementById('app'));
