import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';

function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // Додали стан для відстеження відкриття/закриття списку

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&page=1`;
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjhkN2Q2YTBkZTY4ZjQxMGNjMmY4Nzc4MWY2ODNiOSIsInN1YiI6IjY1ZjA4YzYxZmNlYzJlMDE3YTgzNTU1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ni7uDJYlr9RgK8OEaZWldZPd3DQ1GgJh62tDTqnK2x8';
        const options = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        
        axios.get(url, options)
          .then(response => setCast(response.data.cast))
          .catch(err => console.error(err));
    }, [movieId]);

    // Функція для зміни стану при кожному кліку
    const toggleList = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.expand} onClick={toggleList}>Movie Cast</h2>
            {/* Використовуємо стан isOpen для умовного відображення списку */}
            {isOpen && (
                <ul className={styles.castList}>
                    {cast.map(actor => (
                        <li key={actor.id} className={styles.actor}>
                            <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt='- Photo not found'></img>
                            <div>
                                <b>Actor Name:</b> {actor.name}
                                <br/>
                                <b>Character:</b> {actor.character}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MovieCast;
