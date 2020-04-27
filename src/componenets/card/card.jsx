/* eslint-disable arrow-body-style */
import React from 'react';
import style from './card.module.css';

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
            src={`${secureBaseUrl}${posterSizes.w500}${posterPath}`}
            alt={title}
        />
    );
};

const Card = (props) => {
    const { entry } = props;
    return (
        <div key={entry.id} className={style.posterCard}>
            {getPosterImg(entry.title, entry.poster_path)}
            <div className={style.overlay}>
                Text here
            </div>

        </div>

    );
};

export default Card;
