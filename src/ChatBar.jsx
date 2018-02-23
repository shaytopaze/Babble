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
    // Conditions for setting username
    if (event.key === 'Enter' && event.target.value === '') {
      alert("Please enter a username!");
    }
    if ((event.target.value).length > 20) {
      alert("Too many characters");
      event.target.value = '';
      this.setState({username: ''})
    }
    // If username has been changed properly - send username to changeUsername function!
    if (this.onUsernameChange && event.key === 'Enter' && event.target.value !== '') {
      this.props.changeUsername(this.state.username);
    }

    this.setState({type: 'user'});
  }

  onMessageKeyPress(event) {
    // Conditions for setting message
    if (this.state.username === '') {
      this.setState({username: 'Anonymous'});
    }
    if ((event.target.value).length > 140) {
      alert("Too many characters");
      return;
    }
    if (event.key === 'Enter' && event.target.value === '') {
        alert('Please enter a message!');
      }
    // If message has been changed properly - send message to sendMessage function!
    if (event.key === 'Enter' && event.target.value !== '') {
      this.props.sendMessage(this.state.username, this.state.messageText);
      this.setState({messageText: ''});
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


