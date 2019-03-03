import React, { Component } from 'react';
import './Label.css'
import Image from 'react-bootstrap/Image';
import Icon from 'react-native-vector-icons/FontAwesome';



class Label extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            title: '',
            year: '',
            imdbID: '',
            type: '',
            favorite: false,
    };

render() {
    const { image, title, year, imdbID, type, favorite } = this.state;

    return (
        <Container>
            <title>{title}</title>
            <Image src={image}/>
            <Icon
                name={favorite ? 'star' : 'star-o'}
                color={favorite ? '#FFD700' : 'rgb(255,215,0)'}
                size={30}
                style={{ marginBottom: 10, marginTop: 20 }}
                onPress={() => this.setState({ favorite: !favorite })}
            />
            <p>{ year }</p>
            <p>{ imdbID }</p>
            <p>{ type }</p>
            {favorite ? 'Remove from favorite' : 'Add to favorite'}
        </Container>
    )
}
}

export default Label;