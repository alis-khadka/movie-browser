import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Image, Col } from 'react-bootstrap';


class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {}
    }
  }

  componentDidMount() {
    axios.get(
      `https://www.omdbapi.com/?apikey=e3a5d84f&i=${
      this.props.movieID
      }&plot=full`
    )
      .then(res => res.data)
      .then(res => {
        this.setState({ movieData: res });
      });
  }

  render() {
    const {
      Title,
      Released,
      Director,
      Writer,
      Actors,
      Plot,
      Poster,
      imdbRating
    } = this.state.movieData;

    return (
      <Col md={{ span: 6, offset: 3 }}>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <Col>
                <Image src={Poster} rounded />
              </Col>
              <h2><center>{Title}</center></h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>
              <h4>{`Released on: ${Released}`}</h4>
              <h4>{`IMDB Rating: ${imdbRating}`}</h4>
            </span>
            <h5><u>Director:</u> {Director}</h5>
            <h5><u>Writers:</u> {Writer}</h5>
            <h5><u>Cast & Crews:</u> {Actors}</h5>
            <h5><u>Plot:</u></h5>
            <p>{Plot}</p>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Col>
    )
  }
}

export default MovieDetail;