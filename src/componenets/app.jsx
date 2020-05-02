
/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from 'react';
import '@babel/polyfill';
import Navbar from './navBar/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './app.module.css';
import Gallery from './gallery/gallery';
import {
  performFetch,
  getDiscoverUri, getSearchUri,
  normalizeSearchResults,
  normalizeDiscoverResults,
} from './tmdbAPIHandler';
import { ViewModes, MediaTypes } from './interfaces';

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


  const [items, setItems] = useState([]);

  const onFetchSuccess = (type, viewMode, shouldAppend) => (responseData) => {
    const normalizedResults = viewMode === ViewModes.Search
      ? normalizeSearchResults(responseData.results)
      : normalizeDiscoverResults(type, responseData.results);

    sethasMore(responseData.page < responseData.total_pages);
    setLastLoadedPage(responseData.page);
    setItems([]);
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
        setViewingMode(ViewModes.Discover);
        setSearchQuery('');
      });
  };

  const handleSearch = () => {
    const apiUri = getSearchUri(searchQuery, 1);
    performFetch(apiUri, onFetchSuccess(undefined, ViewModes.Search, false))
      .then(() => {
        setViewingMode(ViewModes.Search);
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
      <Navbar
        onShowTypeSelect={handleShowTypeSelect}
        onSearchBtnClick={handleSearch}
        onSearchKeyDown={handleSearchKeyDown}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

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
