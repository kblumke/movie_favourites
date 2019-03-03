import React, { Component } from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Search from './Search/Search';

class App extends Component {

  handleClick = (e) => {
    fetch('http://www.omdbapi.com/?apikey=1dc40cfd&s=' + e).then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
    });
  }

  render() {
    return (
      <div className="App container">
        <Nav className="justify-content-center" variant="tabs" defaultActiveKey="search">
          <Nav.Item>
            <Nav.Link eventKey="search">Search</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="list">Favourites</Nav.Link>
          </Nav.Item>
        </Nav>
        <Search
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default App;
