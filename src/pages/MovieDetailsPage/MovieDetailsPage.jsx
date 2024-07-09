import React, { useState, useEffect } from 'react';
import { useParams, useNavigate   } from 'react-router-dom';
import axios from 'axios';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjhkN2Q2YTBkZTY4ZjQxMGNjMmY4Nzc4MWY2ODNiOSIsInN1YiI6IjY1ZjA4YzYxZmNlYzJlMDE3YTgzNTU1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ni7uDJYlr9RgK8OEaZWldZPd3DQ1GgJh62tDTqnK2x8'; // Підставте свій токен
        const options = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        
        axios.get(url, options)
          .then(response => setMovie(response.data))
          .catch(err => console.error(err));
    }, [movieId]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.goBackButton}> ← Go Back </button>
            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} className={styles.poster} alt={movie.title} />
            <h1 className={styles.title}>{movie.title}</h1>
            <h1 className={styles.userScore}>User Score: <b>{movie.vote_average} / 10</b></h1>
            <h2 className={styles.heading}>Overview</h2>
            <p className={styles.overview}>{movie.overview}</p>
            <h2 className={styles.heading}>Genres</h2>
            <ul className={styles.genresList}>
                {movie.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
            <hr />
            <p className={styles.additionalInfo}>Additional Information</p>
            <div className={styles.additionalDetails}>
                <MovieCast movieId={movieId} />
                <MovieReviews movieId={movieId} />
            </div>
            <hr />
        </div>
    );
}

export default MovieDetailsPage;
