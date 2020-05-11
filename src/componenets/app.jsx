
import '@babel/polyfill';
import React, { useCallback, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { doQuery, useQuery } from '../query';
import Page404 from './404';
import { useErrorStatus, useLoadingStatus } from './errorHandler';
import Gallery from './gallery/gallery';
import { MediaTypes, ViewModes } from './interfaces';
import WithLoading from './loading/loading';
import NavBarMaterial from './navBar/navBarMaterial';
import ShowDetails from './showPage/showDetails';
import {
  getDiscoverUri, getSearchUri, normalizeDiscoverResults, normalizeSearchResults
} from './tmdbAPIHandler';

const App = () => {
  const [hasMore, sethasMore] = useState(true);
  const [currentMediaType, setMediaType] = useState(MediaTypes.Movie);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [lastLoadedPage, setLastLoadedPage] = useState(0);
  const [viewingMode, setViewingMode] = useState(ViewModes.Discover);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const history = useHistory();
  const { setErrorStatusCode } = useErrorStatus();
  const { setLoadingStatus, ..._ } = useLoadingStatus();

  const contextParams = useCallback(() => ({ setErrorStatusCode, setLoadingStatus }));


  const updatePagesState = ({ mediaType, viewMode, firstPage }) => (responseData) => {
    const normalizedResults = viewMode === ViewModes.Search
      ? normalizeSearchResults(responseData.results)
      : normalizeDiscoverResults(mediaType, responseData.results);

    sethasMore(responseData.page < responseData.total_pages);
    setLastLoadedPage(responseData.page);

    if (!firstPage) {
      setItems([...items, ...normalizedResults]);
    } else {
      setItems(normalizedResults);
    }
    setViewingMode(viewMode);
    setMediaType(mediaType);
  };


  useQuery(
    {
      url: getDiscoverUri(currentMediaType, sortBy, lastLoadedPage + 1),
      callback: updatePagesState({
        mediaType: currentMediaType,
        viewMode: ViewModes.Discover,
        firstPage: true
      })
    }
  );


  const loadMore = () => {
    const apiUri = viewingMode === ViewModes.Search
      ? getSearchUri(searchQuery, lastLoadedPage + 1)
      : getDiscoverUri(currentMediaType, sortBy, lastLoadedPage + 1);
    doQuery({
      url: apiUri,
      callback: updatePagesState({
        mediaType: currentMediaType,
        viewMode: viewingMode,
        firstPage: false
      }),
      ...contextParams()

    });
  };
  const onDiscoverSuccess = (mediaType) => (data) => {
    updatePagesState({
      mediaType,
      viewMode: ViewModes.Discover,
      firstPage: true
    })((data));
    setSearchQuery('');
    history.push(`/${mediaType}/`);
  };

  const onSearchSuccess = (responseData) => {
    updatePagesState({
      mediaType: MediaTypes.All,
      viewMode: ViewModes.Search,
      firstPage: true
    })(responseData);
    history.push('/');
  };

  const onMediaTypeSelect = (mediaType) => {
    doQuery(
      {
        url: getDiscoverUri(mediaType, sortBy, 1),
        callback: onDiscoverSuccess(mediaType),
        ...contextParams()
      }
    );
  };


  const search = () => {
    doQuery({
      url: getSearchUri(searchQuery, 1),
      callback: onSearchSuccess,
      ...contextParams()
    });
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      search();
    }
  };


  return (
    <>

      <NavBarMaterial
        showType={currentMediaType === MediaTypes.All ? false : currentMediaType}
        onShowTypeSelect={onMediaTypeSelect}
        onSearchKeyDown={handleSearchKeyDown}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      <Switch>
        <Route path="/show/:showId" exact component={ShowDetails} />
        <Route
          path={['/', '/tv/', '/movie/']}
          exact
          render={() => (
            <WithLoading>
              <Gallery
                entries={items}
                loadMore={loadMore}
                hasMore={hasMore}
                page={lastLoadedPage + 1}
              />
            </WithLoading>

          )}
        />
        <Route component={Page404} />

      </Switch>
    </>


  );
};

export default App;
