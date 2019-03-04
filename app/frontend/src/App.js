import React, { Component } from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Search from './Search/Search';
import Label from './Label/Label';
import Pagination from "react-js-pagination";


class App extends Component {

  state = {
    data: [],
    active: 0,
    all_items: 0,
    activePage: 1,
  }

  handleClick = (e) => {
    this.last_query = 'http://www.omdbapi.com/?apikey=1dc40cfd&s=' + e
    fetch(this.last_query)
    .then(response => response.json())
    .then(data => this.setState({ data: data['Search'], all_items: data['totalResults']}))
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    fetch(this.last_query + '&page=' + pageNumber)
      .then(response => response.json())
      .then(data => {
        this.setState({data: data['Search'], activePage: pageNumber});
      })
  }

  render() {
    console.log(this.state);


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
          {this.state.data.map((item) =>
            <Label 
              key={ item['imdbID'] }
              image={ item['Poster'] }
              title={ item['Title'] }
              year= { item['Year'] }
              imdbID={ item['imdbID'] }
              type={ item['Type'] } />
          )}
          </div>
          <div>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={10}
              totalItemsCount={this.state.all_items}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div>
      </div>
    );
  }
}

export default App;
