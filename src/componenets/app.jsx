/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */

import React, { useState, useEffect } from 'react';
import '@babel/polyfill';
import fetchRetry from 'fetch-retry';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './app.module.css';
import Gallery from './gallery/gallery';
import fetchWithTimeout from '../utils';

const tmdbApiBaseUrl = 'https://api.themoviedb.org/3/discover/';
const retryFetch = fetchRetry(fetchWithTimeout(2000), {
    retries: 3,
    retryDelay: 3000
});

const getPosterImg = (title, posterPath) => {
    const secureBaseUrl = 'https://image.tmdb.org/t/p/';
    const posterSizes = {
        w92: 'w92',
        w154: 'w154',
        w185: 'w185',
        w342: 'w342',
        w500: 'w500',
        w780: 'w780',
        original: 'original'
    };
    return (
        <img
            src={`${secureBaseUrl}${posterSizes.w500}${posterPath}`}
            alt={title}
        />
    );
};

const appendApiKeyParam = (url) => (url.includes('?')
    ? `${url}&api_key=${process.env.TMDB_API_KEY}`
    : `${url}?api_key=${process.env.TMDB_API_KEY}`);


const getTrending = (timeFrame = 'week') => {
    const url = appendApiKeyParam(`https://api.themoviedb.org/3/trending/all/${timeFrame}`);
    return fetch(url).then((response) => response.json());
};

const discover = (page = 1, type = 'movie', sortBy = 'popularity.desc') => {
    const url = `${tmdbApiBaseUrl}${type}/?page=${page}&sort_by=${sortBy}&include_adult=false&include_video=false`;
    return retryFetch(appendApiKeyParam(url));
};

const App = () => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, sethasMore] = useState(true);

    const [items, setItems] = useState([]);

    const loadMore = async (page) => {
        try {
            const response = await discover(page);
            const responseData = await response.json();
            sethasMore(responseData.page < responseData.total_pages);
            setItems([...items, ...responseData.results]);
        } catch (e) {
            console.log();
        }
    };

    // useEffect(() => {
    //     const fetchFromAPI = async () => {
    //         try {
    //             const response = await discover();
    //             const responseData = await response.json();
    //             setItems(responseData.results);
    //             setLoaded(true);
    //         } catch (e) {
    //             setError(e);
    //         }
    //     };
    //     fetchFromAPI();
    // }, []);

    return (
        <>

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Popcorn</Navbar.Brand>


            </Navbar>
            <Gallery entries={items} loadMore={loadMore} hasMore={hasMore} />


        </>
    );
};

export default App;
