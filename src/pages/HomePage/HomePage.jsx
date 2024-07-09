import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjhkN2Q2YTBkZTY4ZjQxMGNjMmY4Nzc4MWY2ODNiOSIsInN1YiI6IjY1ZjA4YzYxZmNlYzJlMDE3YTgzNTU1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ni7uDJYlr9RgK8OEaZWldZPd3DQ1GgJh62tDTqnK2x8';
        const options = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        
        axios.get(url, options)
          .then(response => setMovies(response.data.results))
          .catch(err => console.error(err));
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Trending Movies</h1>
            <MovieList movies={movies} />
        </div>
    );
}

export default HomePage;
