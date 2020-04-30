/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */

import React, { useState, useEffect, useReducer } from 'react';
import '@babel/polyfill';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './app.module.css';
import Gallery from './gallery/gallery';
import { normalizeTmdbResult, performFetch, getDiscoverUri } from './tmdbAPIHandler';

const isSearch = (mode) => mode === 'search';

const App = () => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, sethasMore] = useState(true);
    const [showType, setShowType] = useState('tv');
    const [sortBy, setSortBy] = useState('popularity.desc');
    const [lastLoadedPage, setLastLoadedPage] = useState(0);
    const [mode, setMode] = useState('discover');


    const [items, setItems] = useState([]);

    const onFetchSuccess = (type, shouldAppend) => (responseData) => {
        sethasMore(responseData.page < responseData.total_pages);
        setLastLoadedPage(responseData.page);
        const normalizedResults = responseData.results.map(normalizeTmdbResult(type === 'movie'));
        if (shouldAppend) {
            setItems([...items, ...normalizedResults]);
        } else {
            setItems(normalizedResults);
        }
    };


    const loadMore = () => {
        const apiUri = isSearch(mode) ? '' : getDiscoverUri(showType, sortBy, lastLoadedPage + 1);
        performFetch(apiUri, onFetchSuccess(showType, true));
    };

    const handleShowTypeSelect = (movieOrTv) => {
        const apiUri = isSearch(mode) ?  : getDiscoverUri(movieOrTv, sortBy, 1);
        performFetch(apiUri, onFetchSuccess(movieOrTv, false))
            .then(() => setShowType(movieOrTv));
    };

    useEffect(() => {
        performFetch(getDiscoverUri(showType, sortBy, lastLoadedPage + 1),
            onFetchSuccess(showType, false));
    }, []);


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
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button onClick={} variant="outline-success">Search</Button>
                </Form>


            </Navbar>
            <Gallery
                entries={items}
                loadMore={loadMore}
                hasMore={hasMore}
                page={lastLoadedPage + 1}
            />


        </>
    );
};

export default App;
