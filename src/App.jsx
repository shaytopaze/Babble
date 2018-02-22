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
      connectedClients: []
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://0.0.0.0:3001");
    this.socket.onmessage = (event) => {
      console.log("HEY IM EVENT", event);
      let tempMessages = this.state.messages;
      tempMessages.push(JSON.parse(event.data));
      const eventData = JSON.parse(event.data);
      if (eventData.type === 'user' || eventData.type === 'system') {
        this.setState({
          currentUser: eventData.username,
          messages: tempMessages});

      } else {
        const connectedClients = JSON.parse(event.data);
        this.setState({connectedClients: connectedClients});
      }
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

  sendMessage(username, content) {
    const message = {
      type: 'user',
      content: content,
      username: username
    };

    this.newMessage(message);
  }

  newMessage(message) {
    this.socket.send(JSON.stringify(message));
  }

  render() {
    console.log("Rendering <App />");
    console.log(this.state.messages);
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










