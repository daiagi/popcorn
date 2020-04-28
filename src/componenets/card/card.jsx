/* eslint-disable arrow-body-style */
import React from 'react';
import StarRatings from 'react-star-ratings';
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
            className={style.posterImg}
        />
    );
};

const Card = (props) => {
    const { entry } = props;
    const starRating = entry.vote_average / 2;
    return (
        <div key={entry.id} className={style.posterCard}>
            {getPosterImg(entry.title, entry.poster_path)}
            <div className={style.overlay}>
                <p className={style.title}>
                    {entry.title}
                </p>
                <p className={`${style.title} ${style.year} `}>
                    {entry.release_date.substring(0, 4)}
                </p>
                <div className={style.starRating}>
                    <StarRatings
                        rating={starRating}
                        starRatedColor="#0b0c0c"
                        starEmptyColor="#bdc4cb"
                        starDimension="20px"
                        starSpacing="1px"
                        numberOfStars={5}
                        name="rating"
                    />
                </div>
            </div>

        </div>

    );
};

export default Card;
