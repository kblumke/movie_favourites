import React, { Component } from 'react';
import './Search.css'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



class Search extends Component {

handleClick = (e) => {
    e.preventDefault();
    this.props.onClick(this.search.value)
}

render() {
    return (
        <Form onSubmit={this.handleClick}>
            <InputGroup className="mb-3 mt-5">
            <FormControl
                placeholder="Movie title"
                aria-label="Movie title"
                aria-describedby="basic-addon2"
                ref={input => this.search = input}
            />
            <InputGroup.Append>
            <Button variant="outline-secondary"
                onClick={this.handleClick}
            >Search</Button>
            </InputGroup.Append>
        </InputGroup>
      </Form>
    )
}
}

export default Search;