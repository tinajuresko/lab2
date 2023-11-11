import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import MyComponent from './XSS';
import UserComponent from './User';
import AdminComponent from './Admin';
import AdminLoginComponent from './AdminLogin';
import AdminDeniedComponent from './Access-denied';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAccessControlChecked: localStorage.getItem('isAccessControlChecked') === 'true' || false,
      isComponentMounted: false,
    };
  }

  componentDidMount() {
    this.setState({ isComponentMounted: true });

    // Update local storage s obzirom na trenutno stanje
    const checkbox = document.getElementById('myCheckbox');
    if (checkbox) {
      localStorage.setItem('isAccessControlChecked', checkbox.checked.toString());
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Update local storage ako se stanje promini
    if (prevState.isAccessControlChecked !== this.state.isAccessControlChecked) {
      localStorage.setItem('isAccessControlChecked', this.state.isAccessControlChecked.toString());
    }
  }

  toggleAccessControl = () => {
    this.setState((prevState) => ({
      isAccessControlChecked: !prevState.isAccessControlChecked,
    }));
  };

  handleAdminRoute = () => {
    const { isAccessControlChecked, isComponentMounted } = this.state;

    if (isComponentMounted) {
      if (isAccessControlChecked) {
        return <AdminLoginComponent />;
      } else {
        return <AdminComponent />;
      }
    }

    return null;
  };

  render() {
    const { isAccessControlChecked } = this.state;
    const currentPath = window.location.pathname;

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="header">Learn about possible web application vulnerabilities!</h1>
          </header>

          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/user">User Page</a>
              </li>
              {currentPath !== '/admin-login' && currentPath !== '/access-denied' && (
                <li>
                  <a href={isAccessControlChecked ? '/admin-login' : '/admin'}>
                    {isAccessControlChecked ? 'Admin Login Page' : 'Admin Page'}
                  </a>
                </li>
              )}
            </ul>
          </nav>

          <hr></hr>
          <h1>Broken Access Control</h1>
          <label>
            <input type="checkbox" id="myCheckbox" checked={isAccessControlChecked} onChange={this.toggleAccessControl} />
            Toggle Access Control
          </label>
          <br></br>
          <hr></hr>

          <Switch>
            <Route path="/user" component={UserComponent} />
            <Route path="/admin-login" exact render={() => <AdminLoginComponent toggleAccessControl={this.toggleAccessControl} />} />
            <Route path="/admin" exact render={this.handleAdminRoute} />
            <Route path="/access-denied" component={AdminDeniedComponent} />
            <Route exact path="/" component={MyComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
