import React, { Component } from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Search from './Search/Search';
import Label from './Label/Label';

class App extends Component {

  state = {
    data: [],
    active: 0,
    all_items: 0
  }

  handleClick = (e) => {
    fetch('http://www.omdbapi.com/?apikey=1dc40cfd&s=' + e)
    .then(response => response.json())
    .then(data => this.setState({ data: data['Search'], all_items: data['totalResults']}))
  }

  render() {

    const data = this.state.data;

    return (
      <div className="App container">
        <h1>Movie favourites</h1>
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
          <div className="Results">
          {data.map((item) =>
            <Label 
              image={ item['Poster'] }
              title={ item['Title'] }
              year= { item['Year'] }
              imdbID={ item['imdbID'] }
              type={ item['Type'] } />
          )}
          </div>
      </div>
    );
  }
}

export default App;
