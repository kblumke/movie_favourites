import React, { PureComponent } from 'react';
import './Label.css'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
    };
    }

    componentWillMount() {
        const { image, title, year, imdbID, type, favorite } = this.props;
        this.setState({ image, title, year, imdbID, type, favorite });
    }

    render() {
    const { image, title, year, imdbID, type, favorite } = this.state;

        return (
            <div className="Label">
                <FontAwesomeIcon
                    name={favorite ? 'star' : 'star-o'}
                    color={favorite ? '#FFD700' : 'rgb(255,215,0)'}
                    size={30}
                    style={{ marginBottom: 10, marginTop: 20 }}
                    onPress={() => this.setState({ favorite: !favorite })}
                />
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
                            <ListGroup.Item>{favorite ? 'Remove from favorite' : 'Add to favorite'}</ListGroup.Item>
                        </ListGroup>
                        <FontAwesomeIcon
                            name={favorite ? 'star' : 'star-o'}
                            color={favorite ? '#FFD700' : 'rgb(255,215,0)'}
                            size={30}
                            style={{ marginBottom: 10, marginTop: 20 }}
                            onPress={() => this.setState({ favorite: !favorite })}
                        />
                    </Col>
                </Row>
                </Container>
            </div>

                


        )
}
}

export default Label;