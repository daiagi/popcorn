/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from 'react';
import StarRatings from 'react-star-ratings';

import { useParams, useLocation } from 'react-router-dom';
import {
  performFetch, getDetailsUri, normalizeTmdbResult, getVideoUri
} from '../tmdbAPIHandler';

import '@babel/polyfill';


import 'bootstrap/dist/css/bootstrap.min.css';
import style from './showDetails.module.scss';
import PosterImg from '../posterImg';
import { PosterSizes } from '../interfaces';

const parseTime = (time) => {
  if (time === null || time === undefined) {
    return '';
  }
  const houres = parseInt(time / 60, 10);
  const minutes = time % 60;
  const houresString = (houres > 0) ? `${houres}h` : '';
  return `${houresString} ${minutes}m`;
};
const ShowDetails = ({ match, location }) => {
  const { showId } = useParams();
  const mediaType = new URLSearchParams(useLocation().search).get('mediaType');
  const [details, setDetails] = useState({});
  const [videos, setVideos] = useState([]);
  const publishYear = details?.releaseDate?.substring(0, 4) || '';
  const onFetchDetailsSuccess = (responseData) => {
    const {
      poster_path: posterPath, releaseDate, title,
      voteAverage, backdrop_path: backdropPath,
      overview, runtime, genres,
      ...theRest
    } = normalizeTmdbResult(mediaType, responseData);
    setDetails({
      posterPath,
      releaseDate,
      title,
      voteAverage,
      backdropPath,
      overview,
      runtime,
      genres: genres?.map((g) => g.name)

    });
  };
  const onFetchVideosSuccess = (responseData) => {
    const youtubeTrailers = responseData?.results?.filter(
      (video) => video.site === 'YouTube' && video.type === 'Trailer');
    setVideos(youtubeTrailers || []);
  };
  useEffect(() => {
    performFetch(getDetailsUri(mediaType, showId),
      onFetchDetailsSuccess);
    performFetch(getVideoUri(mediaType, showId), onFetchVideosSuccess);
  }, []);

  return (

    <div className={style.container}>
      <div
        className={style.videoContainer}
      >
        {
          videos[0]?.key
          && (
            <iframe
              className={style.youtubePreview}
              title="showTrailer"
              src={`https://www.youtube-nocookie.com/embed/${videos[0].key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )
        }

      </div>

      <div className={style.titleInfo}>
        <div className={style.ShowDetails}>
          <show-title>
            {details?.title}
          </show-title>
          <span>{publishYear}</span>
          <span className={style.verticalLine}>|</span>
          <span>{parseTime(details?.runtime)}</span>
          <span className={style.verticalLine}>|</span>
          <span>{details?.genres?.join(', ')}</span>
          <div />
        </div>

        <div className={style.rating}>
          <StarRatings
            rating={1}
            starRatedColor="#ffc107"
            starEmptyColor="#bdc4cb"
            starDimension="30px"
            starSpacing="1px"
            numberOfStars={1}
            name="rating"
          />
          <div>

            {`${details?.voteAverage} / 10`}

          </div>
        </div>

      </div>
      <div className={style.details}>
        <div className={style.posterImgContainer}>
          <PosterImg
            posterPath={details?.posterPath}
            title={details?.title}
            className={style.posterImg}
            size={PosterSizes.w342}
          />
        </div>
        <div className={style.summery}>
          <p>
            {details?.overview}
          </p>
          <p>Directors: Jeff Fowler</p>
          <p>Directors: Jeff Fowler</p>
        </div>
      </div>
    </div>
  );
};


export default ShowDetails;
