import React from 'react';
import ReactDom from 'react-dom';
import Recipient from './components/Recipient';
import Body from './components/Body';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      to: '',
      body: ''
    }
  }

  handleChange(e){
    this.setState({})

  }

  scheduleMessage(e){
    e.preventDefault(); //prevent screen refresh

    console.log('message sent');

    axios.post('/send',{
      to: '',
      body: 'yoooo',
      date: Date.now()
    })
    .then((res)=> console.log(res));
  }

  render() {

    return (<div>
              <form>
                <Recipient />
                <Body />
                <input type="submit" value="submit" onClick={this.scheduleMessage} />
              </form>
            </div>);
  }
};

ReactDom.render(<App/>, document.getElementById('app'));
