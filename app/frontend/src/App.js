import React, { Component } from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Search from './Search/Search';
import Label from './Label/Label';
import Pagination from "react-js-pagination";
import { favouritesURL, loginURL } from './config'
import Login from './Login/Login';

class App extends Component {

  state = {
    data: [],
    active: 0,
    all_items: 0,
    activePage: 1,
    favourites: [],
    user: localStorage.user,
    user_token: localStorage.token,
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

  fetchFavourites = () => {
    fetch(favouritesURL, {
      headers: {
        'Authorization': 'Token ' + localStorage.token,
      },
    })
    .then(response => response.json())
    .then(data => this.setState({ favourites: data.map((d) => d['imdbID'] ) }))
  }

  componentDidMount = () => {
    if (localStorage.token) {
      this.fetchFavourites()
    }
  }

  signIn = (username, password) => {
    fetch(loginURL, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          'username': username,
          'password': password,
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Login failed');
    })
    .then(json => {
      this.setState({
        user: username,
        user_token: json.key
      })
      localStorage.token = json.key
      localStorage.user = username
      this.fetchFavourites()
    })
  }
  
  signOut() {
    this.setState({user: null})
  }

  render() {
    console.log(this.state);


    return (
      <div className="App container">
        <h1>Movie favourites</h1>
          { 
            (this.state.user) ? 
            <div>
            <div>
              <Search
                onClick={this.handleClick}
              />
            </div>
            <div className="Results">
              {this.state.data.map((item) =>
                <Label 
                  key={ item['imdbID'] + (this.state.favourites.indexOf(item['imdbID']) !== -1 ? '1': '0')}
                  image={ item['Poster'] }
                  title={ item['Title'] }
                  year= { item['Year'] }
                  imdbID={ item['imdbID'] }
                  type={ item['Type'] } 
                  favorite={ this.state.favourites.indexOf(item['imdbID']) !== -1 }/>
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
            :
              <div id="app">
              <Login 
              onSignIn={this.signIn.bind(this)} 
              />
              </div>
          }
        </div>
    );
  }
}

export default App;
