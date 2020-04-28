/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */

import React, { useState, useEffect } from 'react';
import '@babel/polyfill';
import fetchRetry from 'fetch-retry';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './app.module.css';
import Gallery from './gallery/gallery';
import fetchWithTimeout from '../utils';

const tmdbApiBaseUrl = 'https://api.themoviedb.org/3/discover/';
const retryFetch = fetchRetry(fetch, {
    retries: 3,
    retryDelay: 3000
});


const appendApiKeyParam = (url) => (url.includes('?')
    ? `${url}&api_key=${process.env.TMDB_API_KEY}`
    : `${url}?api_key=${process.env.TMDB_API_KEY}`);


const discover = (type = 'movie', sortBy = 'popularity.desc', page = 1) => {
    const url = `${tmdbApiBaseUrl}${type}/?page=${page}&sort_by=${sortBy}&include_adult=false&include_video=false`;
    return retryFetch(appendApiKeyParam(url));
};

const App = () => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, sethasMore] = useState(true);
    const [showType, setShowType] = useState('movie');
    const [sortBy, setSortBy] = useState('popularity.desc');
    const [page, setPage] = useState(1);

    const [items, setItems] = useState([]);

    const loadMore = async () => {
        try {
            const response = await discover(showType, sortBy, page);
            const responseData = await response.json();
            sethasMore(responseData.page < responseData.total_pages);
            setItems([...items, ...responseData.results]);
            setPage(page + 1);
        } catch (e) {
            console.log();
        }
    };

    const handleShowTypeSelect = (movieOrTv) => {
        setShowType(movieOrTv);
        setItems([]);
        setPage(1);
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
                <Nav>
                    <Nav.Item onClick={() => handleShowTypeSelect('tv')}>
                        <img src="../../icons/television.svg" alt="TV" />
                    </Nav.Item>
                    <Nav.Item onClick={() => handleShowTypeSelect('movie')}>
                        <img src="../../icons/icons8-final-cut-pro-x.svg" alt="Movies" />
                    </Nav.Item>

                </Nav>


            </Navbar>
            <Gallery entries={items} loadMore={loadMore} hasMore={hasMore} page={page} />


        </>
    );
};

export default App;
