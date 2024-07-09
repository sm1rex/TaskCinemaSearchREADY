import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><NavLink to="/" className={styles.navLink}>Home</NavLink></li>
                <li><NavLink to="/movies" className={styles.navLink}>Movies</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navigation;
