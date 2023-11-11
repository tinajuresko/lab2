import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class AdminLoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  
    
    const { username, password } = this.state;
    if (username === 'adminn' && password === 'adminn123') {
      
      this.props.history.push('/admin');
      this.props.toggleAccessControl && this.props.toggleAccessControl(false);
      
      window.location.reload();
    } else {
      
      this.props.history.push('/access-denied');
      window.location.reload();
    }
  };
  

  render() {
    return (
      <div>
        <h2>Admin Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AdminLoginComponent);
