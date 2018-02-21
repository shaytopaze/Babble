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

  onUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }

  onUsernameKeyPress(event) {
    if (this.onUsernameChange && event.key === 'Enter') {
      // const systemMessage = {
      //   type: this.state.type,
      //   content: this.props.username + " changed name to " + this.state.username
      // }
      // this.props.newMessage(systemMessage);
      // this.setState({type: 'system'});

      this.props.changeUsername(this.state.username);
    }
    this.setState({type: 'user'});
  }

  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      // const newMessage = {
      //   // id: 'id',
      //   type: this.state.type,
      //   username: this.state.username,
      //   content: this.state.messageText
      // }
      // this.props.newMessage(newMessage);
      // this.setState({messageText: ' '});

      this.props.sendMessage(this.state.messageText);
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

