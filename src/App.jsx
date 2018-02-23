import React, {Component} from 'react';
import Navbar from './Nav.jsx'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous', // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], // messages coming from the server will be stored here
      connectedClients: [],
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://0.0.0.0:3001");
    this.socket.onmessage = (event) => {
      let eventData = JSON.parse(event.data);

      let tempMessages = this.state.messages;
      tempMessages.push(eventData);

      // If data received is a MESSAGE...
      if (eventData.type === 'user' || eventData.type === 'system') {
        // Not sure why this needs to be here and be empty, but it does?
        this.setState({});
      }
      // If data received is the array of connectedClients...
      if (eventData.connectedClients) {
        this.setState({connectedClients: eventData.connectedClients});
      }
    }
  }

  changeUsername(newUsername) {
    // save previous name in variable before setting username to changed username
    const previousName = this.state.currentUser;
    // change username to updated username
    this.setState({ currentUser: newUsername });

    const systemMessage = {
      type: 'system',
      content: `${previousName} changed name to  ${newUsername}`,
      username: newUsername
    };

    this.newMessage(systemMessage);
  }

  sendMessage(username, content) {
    if (username !== this.state.currentUser) {
      this.changeUsername(username);
    }

    let message = {
      type: 'user',
      content: content,
      username: username
    };

    this.newMessage(message);
  }

  // takes message and sends to server (either system or user message!)
  newMessage(message) {
    this.socket.send(JSON.stringify(message));
  }

  render() {
    return (
      <div>
      <Navbar connectedClients= {this.state.connectedClients.length} />
      <MessageList messages = {this.state.messages} />
      <ChatBar username= {this.state.currentUser}
      newMessage= {this.newMessage.bind(this)}
      sendMessage={this.sendMessage.bind(this)}
      changeUsername={this.changeUsername.bind(this)} />
      </div>
    );
  }
}

export default App;
















