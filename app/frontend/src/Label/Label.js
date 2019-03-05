import React, { PureComponent } from 'react';
import './Label.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { favouritesURL } from '../config'


class Label extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            title: '',
            year: '',
            imdbID: '',
            type: '',
            favorite: false,
            buttonType: 'primary'
    };
    }

    componentWillMount() {
        const { image, title, year, imdbID, type, favorite } = this.props;
        this.setState({ image, title, year, imdbID, type, favorite });
    }

    setFavourite = (favourite) => {
        this.setState({favorite: favourite});
        if (favourite) {
            fetch(favouritesURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'Poster': this.state.image,
                    'Title': this.state.title,
                    'Type': this.state.type,
                    'Year': this.state.year,
                    'imdbID': this.state.imdbID
                })
            })
        } else {
            fetch(favouritesURL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'imdbID': this.state.imdbID
                })
            })
        }
    }

    render() {
    const { image, title, year, imdbID, type, favorite } = this.state;

        return (
            <div className="Label">
                <Container>
                <Row>
                    <Col xs={6} md={4}>
                        <Image src={image} />
                    </Col>
                    <Col xs={12} md={8}>
                        <ListGroup>
                            <ListGroup.Item><b>Title:</b> { title }</ListGroup.Item>
                            <ListGroup.Item><b>Year of production:</b> { year }</ListGroup.Item>
                            <ListGroup.Item><b>imdbID:</b> { imdbID }</ListGroup.Item>
                            <ListGroup.Item><b>Type:</b> { type }</ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                    variant={favorite ? "danger" : "primary"} 
                                    size="sm"
                                    onClick={() => this.setFavourite(!favorite)}
                                >
                                    {favorite ? 'Remove from favorite' : 'Add to favorite'}
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                </Container>
            </div>

                


        )
}
}

export default Label;