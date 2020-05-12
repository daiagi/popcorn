
import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import PosterImg from '../posterImg';
import style from './card.module.css';

const Card = (props) => {
  const { entry } = props;
  const starRating = entry.voteAverage / 2;
  const publishYear = entry.releaseDate
    ? entry.releaseDate.substring(0, 4)
    : '';

  return (


    <Link to={`/show/${entry.id}?mediaType=${entry.mediaType}`}>
      <div key={entry.id} className={style.posterCard}>
        <PosterImg
          posterPath={entry.poster_path}
          title={entry.title}
          className={style.posterImg}
        />
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
    </Link>


  );
};

export default Card;
