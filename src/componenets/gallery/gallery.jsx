import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import style from './gallery.module.css';
import Card from '../card/card';


function Gallery(props) {
    const { entries, loadMore, hasMore } = props;
    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            initialLoad
            hasMore={hasMore}
            loader={<div className="loader" key={0}>Loading ...</div>}
        >
            <div className={style.gallery}>

                {
                    entries && entries.map((entry) => <Card entry={entry} key={entry.id} />)
                }
            </div>

        </InfiniteScroll>
    );
}

export default Gallery;
