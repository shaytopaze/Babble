import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    if (this.props.connectedClients <= 1) {
      return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">babble. <i className="fa fa-comments"></i></a>
          <p>... you are currently the only one online <i className="fa fa-thumbs-down"></i></p>
        </nav>
      )
    } else {
      return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">babble. <i className="fa fa-comments"></i></a>
          <p> {this.props.connectedClients} friends are online! <i className="fa fa-thumbs-up"></i></p>
        </nav>
      );
     }
  }
}

export default Navbar;
