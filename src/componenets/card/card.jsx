/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
import React from 'react';
import StarRatings from 'react-star-ratings';
// import Spinner from 'react-bootstrap/Spinner';
// import Image from 'react-shimmer';
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
      onError={(ev) => {
        ev.target.src = 'https://www.ice-shop.dk/media/catalog/product/cache/1/image/378x380/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/no_image_placeholder_6.png';
      }}
      className={style.posterImg}
    />

  );
};

const Card = (props) => {
  const { entry } = props;
  const starRating = entry.voteAverage / 2;
  const publishYear = entry.releaseDate
    ? entry.releaseDate.substring(0, 4)
    : '';
  return (
    <div key={entry.id} className={style.posterCard}>
      {getPosterImg(entry.title, entry.poster_path)}
      <div className={style.overlay}>
        <p className={style.title}>
          {entry.title}
        </p>
        <p className={`${style.title} ${style.year} `}>
          {publishYear}
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
