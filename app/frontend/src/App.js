import React, { Component } from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav className="justify-content-center" variant="tabs" defaultActiveKey="search">
          <Nav.Item>
            <Nav.Link eventKey="search">Search</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="list">Favourites</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default App;
