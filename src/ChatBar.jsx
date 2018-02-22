import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      username: '',
      type: ''
    };
  }

  // Listening if user types in username input
  onUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  // Listening if user types in message input
  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }

  onUsernameKeyPress(event) {
    if (this.onUsernameChange && event.key === 'Enter') {
      this.props.changeUsername(this.state.username);
      // this.setState({username: ' '});
    }

    this.setState({type: 'user'});
  }

  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.sendMessage(this.state.username, this.state.messageText);
      this.setState({messageText: ' '});
    }
  }

  render() {
    console.log("Rendering <ChatBar />");
    return (
      <footer className="chatbar">
        <input value={this.state.username}
        onChange={this.onUsernameChange.bind(this)}
        className="chatbar-username"
        placeholder="Your Name (Optional)"
        onKeyPress={this.onUsernameKeyPress.bind(this)} />
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

