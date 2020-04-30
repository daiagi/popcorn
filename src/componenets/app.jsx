/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */

import React, { useState, useEffect, useRef } from 'react';
import '@babel/polyfill';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './app.module.css';
import Gallery from './gallery/gallery';
import {
    normalizeTmdbResult, performFetch,
    getDiscoverUri, getSearchUri
} from './tmdbAPIHandler';

const MediaTypes = {
    TV: 'tv',
    Movie: 'movie'
};
const ViewModes = {
    Discover: 'discover',
    Search: 'search'
};

const isSearch = (mode) => mode === ViewModes.Search;

const App = () => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, sethasMore] = useState(true);
    const [showType, setShowType] = useState(MediaTypes.Movie);
    const [sortBy, setSortBy] = useState('popularity.desc');
    const [lastLoadedPage, setLastLoadedPage] = useState(0);
    const [viewingMode, setViewingMode] = useState(ViewModes.Discover);
    const [searchQuery, setSearchQuery] = useState('');

    const textInput = useRef(null);


    const [items, setItems] = useState([]);

    const onFetchSuccess = (type, viewMode, shouldAppend) => (responseData) => {
        sethasMore(responseData.page < responseData.total_pages);
        setLastLoadedPage(responseData.page);
        // TODO create a seperate function and handle edge cases
        // such as no responseData.results
        const normalizedResults = viewMode === ViewModes.Search
            ? responseData.results
                .filter(
                    (entry) => (entry.media_type === MediaTypes.Movie || entry.media_type === 'tv')
                )
                .map((entry) => normalizeTmdbResult(entry.media_type === MediaTypes.Movie)(entry))
            : responseData.results.map(normalizeTmdbResult(type === MediaTypes.Movie));
        if (shouldAppend) {
            setItems([...items, ...normalizedResults]);
        } else {
            setItems(normalizedResults);
        }
    };


    const loadMore = () => {
        const apiUri = isSearch(viewingMode)
            ? getSearchUri(searchQuery, lastLoadedPage + 1)
            : getDiscoverUri(showType, sortBy, lastLoadedPage + 1);
        performFetch(apiUri, onFetchSuccess(showType, viewingMode, true));
    };

    const handleShowTypeSelect = (movieOrTv) => {
        const apiUri = getDiscoverUri(movieOrTv, sortBy, 1);
        performFetch(apiUri, onFetchSuccess(movieOrTv, ViewModes.Discover, false))
            .then(() => {
                setShowType(movieOrTv);
                isSearch(viewingMode) && setViewingMode(ViewModes.Discover);
                setSearchQuery('');
            });
    };

    const handleSearch = () => {
        const query = textInput.current.value;
        const apiUri = getSearchUri(query, 1);
        performFetch(apiUri, onFetchSuccess(undefined, ViewModes.Search, false))
            .then(() => {
                !isSearch(viewingMode) && setViewingMode(ViewModes.Search);
                setSearchQuery(query);
            });
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter' && event.shiftKey === false) {
            event.preventDefault();
            handleSearch();
        }
    };

    useEffect(() => {
        performFetch(getDiscoverUri(showType, sortBy, lastLoadedPage + 1),
            onFetchSuccess(showType, viewingMode, false));
    }, []);


    return (
        <>

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Popcorn</Navbar.Brand>
                <Nav>
                    <Nav.Item onClick={() => handleShowTypeSelect('tv')}>
                        <img src="../../icons/television.svg" alt="TV" />
                    </Nav.Item>
                    <Nav.Item onClick={() => handleShowTypeSelect(MediaTypes.Movie)}>
                        <img src="../../icons/icons8-final-cut-pro-x.svg" alt="Movies" />
                    </Nav.Item>

                </Nav>
                <Form inline>
                    <FormControl
                        type="text"
                        ref={textInput}
                        value={searchQuery}
                        onKeyPress={handleSearchKeyDown}
                        onChange={() => setSearchQuery(textInput.current.value)}
                        placeholder="Search"
                        className="mr-sm-2"
                    />
                    <Button onClick={handleSearch} type="button" variant="outline-success">Search</Button>
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
