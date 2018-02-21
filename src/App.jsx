import React, {Component} from 'react';
import Navbar from './Nav.jsx'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Annon', // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [] // messages coming from the server will be stored here
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

  changeUsername(newUsername) {
    const previousName = this.state.currentUser;
    this.setState({ currentUser: newUsername });
    const systemMessage = {
      type: 'system',
      content: `${previousName} changed name to  ${newUsername}`
    };

    this.newMessage(systemMessage);
  }

  sendMessage(content) {
    const message = {
      type: 'user',
      content: content,
      username: this.state.currentUser
    };

    this.newMessage(message);
  }

  newMessage(message) {
    // if (message.type === 'user') {
    //   console.log(JSON.parse(message));
    //   this.socket.send(JSON.stringify(message));
    // } else if (message.type === 'system') {
    //   // let systemMessage = {
    //   //   type: message.type,
    //   //   content: message.content
    //   // }
    //   this.socket.send(JSON.parse(message));
    // }
    console.log("IM MESSAGE", message);
    this.socket.send(JSON.stringify(message));
  }

  render() {
    console.log("Rendering <App />");
    return (
      <div>
      <Navbar />
      <MessageList messages = {this.state.messages} />
      <ChatBar username= {this.state.currentUser.name}
      newMessage= {this.newMessage.bind(this)}
      sendMessage={this.sendMessage.bind(this)}
      changeUsername={this.changeUsername.bind(this)} />
      </div>
    );
  }
}


export default App;






