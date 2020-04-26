/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */

import React, { useState, useEffect } from 'react';
import '@babel/polyfill';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './app.module.css';

const appendApiKeyParam = (url) => `${url}?api_key=${process.env.TMDB_API_KEY}`;

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
            src={`${secureBaseUrl}${posterSizes.w92}${posterPath}`}
            alt={title}
        />
    );
};

const getTrending = async (timeFrame = 'week') => {
    const url = appendApiKeyParam(`https://api.themoviedb.org/3/trending/all/${timeFrame}`);
    return fetch(url);
};
const App = () => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const [trending, setTrending] = useState({});
    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const trendingFetchResult = await (await getTrending()).json();
                setTrending(trendingFetchResult);
                setLoaded(true);
            } catch (e) {
                setError(e);
            }
        };
        fetchTrending();
    }, []);

    return (
        <>

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Popcorn</Navbar.Brand>


            </Navbar>

            {
                trending && trending.results
                    ? (
                        <div className={style.gallery}>
                            {
                                trending.results.map((entry) => (
                                    <div key={entry.id} className={style.aDiv}>
                                        {getPosterImg(entry.title, entry.poster_path)}

                                    </div>
                                ))
                            }
                        </div>
                    )
                    : (
                        <div>
                            Loading...
                        </div>

                    )


            }

        </>
    );
};

export default App;
