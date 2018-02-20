import React, {Component} from 'react';
import Navbar from './Nav.jsx'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Shay"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          type: 'user',
          username: "Shay",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          type: 'user',
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: Math.random(), type: 'user', username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

  newMessage(message) {
    const newMessage = this.state.messages;
    newMessage.push(message);
    this.setState({messages: newMessage});
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

