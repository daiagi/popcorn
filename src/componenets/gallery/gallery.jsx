import { makeStyles } from '@material-ui/core';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Card from '../card/card';
import { useLoadingStatus } from '../errorHandler';
import style from './gallery.module.css';


// Todo : insert canonical tags one you have a domain
const locationToMetaTags = {
  '/tv/': () => (
    <title>TV-PoP</title>
  ),
  '/movie/': () => (
    <title>Movies-PoP</title>
    // <link rel="canonical" href="http://mysite.com/example" />
  ),
  '/': () => <title>PoP</title>
};


function Gallery(props) {
  const {
    entries, loadMore, hasMore, page
  } = props;
  const { loadingStatus, ..._ } = useLoadingStatus();
  const location = useLocation();
  const classes = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
  }))();
  return (
    <>
      <Helmet>
        {locationToMetaTags[location.pathname]?.()}
      </Helmet>
      <div className={classes.toolbar} />
      <InfiniteScroll
        pageStart={page}
        loadMore={loadMore}
        hasMore={hasMore}
        initialLoad={false}


      >
        <div className={style.gallery}>

          {
            entries
            && (entries.length > 0)
            && entries.map((entry) => <Card entry={entry} key={entry.id} />)
          }
        </div>

      </InfiniteScroll>
    </>
  );
}

export default Gallery;
