import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

function MoviesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Отримуємо значення параметра query з location.search
        const params = new URLSearchParams(location.search);
        const query = params.get('query');

        if (query) {
            setSearchTerm(query); // Встановлюємо значення searchTerms
            handleSearch(query); // Викликаємо handleSearch з параметром query
        }
    }, [location.search]);

    const handleSearch = async (query) => {
        try {
            const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
            const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjhkN2Q2YTBkZTY4ZjQxMGNjMmY4Nzc4MWY2ODNiOSIsInN1YiI6IjY1ZjA4YzYxZmNlYzJlMDE3YTgzNTU1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ni7uDJYlr9RgK8OEaZWldZPd3DQ1GgJh62tDTqnK2x8';
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.get(url, options)
                .then(response => {
                    setSearchResults(response.data.results);
                })
                .catch(err => console.error(err));
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`?query=${searchTerm}`); // Оновлюємо шлях з новим параметром query
    };

    return (
        <div className={styles.container}>
            <h1>Search Movies</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <MovieList movies={searchResults} />
        </div>
    );
}

export default MoviesPage;
