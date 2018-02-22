import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />");
    const messages = this.props.messages.map((message) => {
      if (message.type === 'user') {
           return (
          <div key={message.id} className="message">
            <span className="message-username" id="colorone" style={{color: message.colour}}>{message.username}</span>
            <span className="message-content">{message.content}</span>
          </div>
        );
      } else if (message.type === 'system') {
        return (
          <div key={message.id} className="message system">
            {message.content}
          </div>
        );
      }
      if (message.type === 'user' && (message.content).match(/jpg$/) ) {
           return (
          <div key={message.id} className="message">
            <span className="message-username" id="colorone" style={{color: message.colour}}>{message.username}</span>
            <span className="message-content"><img src={message.content} /></span>
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
