import React, {Component} from 'react';
import Navbar from './Nav.jsx'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Shay"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [{type:'user', username: 'bob', content:'Welcome', id:'101'}] // messages coming from the server will be stored here
    };
  }


  componentDidMount() {
    this.socket = new WebSocket("ws://0.0.0.0:3001");
    this.socket.onmessage = (event) => {
      //console.log(event.data);
      var tempMessages = this.state.messages;
      //add the new message
      tempMessages.push(JSON.parse(event.data));
      this.setState({messages: tempMessages});

    }
  }

  newMessage(message) {
    console.log(message);
    this.socket.send(JSON.stringify(message));
  }

  render() {
    console.log("Rendering <App />");
    return (
      <div>
      <Navbar />
      <MessageList messages = {this.state.messages} />
      <ChatBar username= {this.state.currentUser.name} newMessage = {this.newMessage.bind(this)} />
      </div>
    );
  }
}


export default App;






