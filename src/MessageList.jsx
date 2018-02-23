import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => {
      // If message is from a user and sends a photo - display photo!
      if (message.type === 'user' && (message.content).match(/(.jpg|.gif|.png|.jpeg)$/) ) {
           return (
          <div key={message.id} className="message">
            <span className="message-username" id="colorone" style={{color: message.colour}}>{message.username}</span>
            <span className="message-content"><img className="image" src={message.content} /></span>
          </div>
        );
      }
      // If message type is user, display username and message content with corresponding styling applied!
      if (message.type === 'user') {
           return (
          <div key={message.id} className="message">
            <span className="message-username" id="colorone" style={{color: message.colour}}>{message.username}</span>
            <span className="message-content">{message.content}</span>
          </div>
        );
      // If message type is system, only display message content with corresponding styling applied!
      } else if (message.type === 'system') {
        return (
          <div key={message.id} className="message system">
            {message.content}
          </div>
        );
      }
    });

    return (
      <div className="messages">
        {messages}
      </div>
    );
  }
}

export default MessageList;
