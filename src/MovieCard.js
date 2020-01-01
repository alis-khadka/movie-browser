import React, { Component } from 'react';
import axios from 'axios';
import { Card } from "react-bootstrap";
import MovieDetail from './MovieDetail';

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {},
      detailShow: false
    }
  }

  componentDidMount() {
    axios.get(
      `https://www.omdbapi.com/?apikey=e3a5d84f&i=${
      this.props.movieID
      }&plot=short`
    )
      .then(res => {
        console.log(res.data);
        return res.data;})
      .then(res => {
        this.setState({ movieData: res });
      });
  }

  setDetailShow(isShow) {
    this.setState({
      detailShow: isShow
    });
  }

  render() {
    const {
      Title,
      Released,
      Genre,
      Plot,
      Poster,
      imdbRating
    } = this.state.movieData;

    if (!Poster || Poster === 'N/A') {
      return null;
    }

    let cursorStyle = {
      cursor: 'pointer',
      width: '302px',
      height: '446px'
    }

    return (
      <Card className="bg-dark text-danger"
        onClick={() => this.setState({
          detailShow: true
        })}
        style={cursorStyle}>
        <Card.Img src={Poster} alt="Card image" style={{
          filter: 'blur(3px)',
          width: '302px',
          height: '446px'
        }} />
        <Card.ImgOverlay>
          <Card.Title><center>{Title}</center></Card.Title>
          <Card.Text><u>Released Date:</u> {Released}</Card.Text>
          <Card.Text><u>Rating:</u> {imdbRating} / 10</Card.Text>
          <Card.Text>
            {Plot && Plot.substr(0, 100)}...
            </Card.Text>
          {Genre &&
            Genre.split(', ').map(g => (
              <Card.Text key={g}><u>{`${g}`}</u></Card.Text>
            ))}
        </Card.ImgOverlay>
        <Card.Text onClick={e => e.stopPropagation()}>
          <MovieDetail
            show={this.state.detailShow}
            onHide={() => this.setState({
              detailShow: false
            },
              () => this.state.detailShow
            )}
            movieID={this.props.movieID}
          />
        </Card.Text>
      </Card>
    );
  }
}

export default MovieCard;