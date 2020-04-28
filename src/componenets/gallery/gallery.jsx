import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import style from './gallery.module.css';
import Card from '../card/card';


function Gallery(props) {
    const {
        entries, loadMore, hasMore, page
    } = props;
    return (
        <InfiniteScroll
            pageStart={page}
            loadMore={loadMore}
            initialLoad
            hasMore={hasMore}
            loader={<div className="loader" key={0}>Loading ...</div>}
        >
            <div className={style.gallery}>

                {
                    entries
                    && (entries.length > 0)
                    && entries.map((entry) => <Card entry={entry} key={entry.id} />)
                }
            </div>

        </InfiniteScroll>
    );
}

export default Gallery;
