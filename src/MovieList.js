import React, { Component } from 'react';
import axios from 'axios';

import MovieCard from './MovieCard';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: ['tt2294629'],
      searchTerrm: ''
    };
  }

  search = event => {
    event.preventDefault();
    axios
      .get(
        `https://www.omdbapi.com/?apikey=e3a5d84f&s=${
        this.state.searchTerm
        }&plot=short`
      )
      .then(res => res.data)
      .then(res => {
        if (!res.Search) {
          this.setState({ movies: [] });
          return;
        }

        const movies = res.Search.map(movie => movie.imdbID);
        this.setState({
          movies
        });
      });
  }

  handleChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  }

  render() {
    const { movies } = this.state;

    return (
      <div>
        <form onSubmit={this.search}>
          <input
            placeholder="Search for a movie"
            onChange={this.handleChange}
          />
          <button type="submit">
            Search
          </button>
        </form>
        <br />
        <br />
        <br />
        {movies.length > 0 ? (
          movies.map(movie => (
            <>
              <MovieCard movieID={movie} key={movie} />
              <br />
              <br />
            </>
          ))
        ) : (
            <p>
              No movie found. Please search again using appropriate name.
          </p>
          )}
      </div>
    );
  }
}

export default MovieList;
