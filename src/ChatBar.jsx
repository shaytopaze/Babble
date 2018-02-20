import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      username: ''
    };
  }

  onUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }

  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      const newMessage = {
        id: Math.random(),
        type: 'user',
        username: this.state.username,
        content: this.state.messageText
      }
      this.props.newMessage(newMessage);
      this.setState({messageText: ' '});
    }
  }

  render() {
    console.log("Rendering <ChatBar />");
    return (
      <footer className="chatbar">
        <input value={this.state.username} onChange={this.onUsernameChange.bind(this)} className="chatbar-username" placeholder="Your Name (Optional)" />
        <input
          value={this.state.messageText}
          onChange={this.onMessageTextChange.bind(this)}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onMessageKeyPress.bind(this)} />
      </footer>
    );
  }
}

export default Chatbar;