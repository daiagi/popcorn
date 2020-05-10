import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { makeStyles } from '@material-ui/core';
import style from './gallery.module.css';
import Card from '../card/card';
import { useLoadingStatus } from '../errorHandler';


function Gallery(props) {
  const {
    entries, loadMore, hasMore, page
  } = props;
  const { loadingStatus, ..._ } = useLoadingStatus();
  const classes = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
  }))();

  return (
    <>
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
