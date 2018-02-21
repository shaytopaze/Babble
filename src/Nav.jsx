import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    console.log("Rendering <Nav />");
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p> {this.props.connectedClients} users online </p>
      </nav>
    );
  }
}

export default Navbar;