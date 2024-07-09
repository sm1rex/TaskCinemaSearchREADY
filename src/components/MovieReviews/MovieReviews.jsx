import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // Додали стан для відстеження відкриття/закриття списку

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjhkN2Q2YTBkZTY4ZjQxMGNjMmY4Nzc4MWY2ODNiOSIsInN1YiI6IjY1ZjA4YzYxZmNlYzJlMDE3YTgzNTU1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ni7uDJYlr9RgK8OEaZWldZPd3DQ1GgJh62tDTqnK2x8'; // Підставте свій токен
        const options = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        
        axios.get(url, options)
          .then(response => setReviews(response.data.results))
          .catch(err => console.error(err));
    }, [movieId]);

    // Функція для зміни стану при кожному кліку
    const toggleList = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.expand} onClick={toggleList}>Movie Reviews</h2>
            {/* Використовуємо стан isOpen для умовного відображення списку */}
            {isOpen && (
                <ul className={styles.reviewsList}>
                    {reviews.map(review => (
                        <li key={review.id} className={styles.review}>
                            <b>Author: {review.author}</b>
                            <br></br>
                            <br></br>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MovieReviews;
