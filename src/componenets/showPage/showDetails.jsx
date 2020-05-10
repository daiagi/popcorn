
import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import PosterImg from '../posterImg';
import {
  getCreditsUri, getDetailsUri, getVideoUri, normalizeTmdbResult, performFetch
} from '../tmdbAPIHandler';
import style from './showDetails.module.scss';


const parseTime = (time) => {
  if (time === null || time === undefined) {
    return '';
  }
  const houres = parseInt(time / 60, 10);
  const minutes = time % 60;
  const houresString = (houres > 0) ? `${houres}h` : '';
  return `${houresString} ${minutes}m`;
};
const ShowDetails = () => {
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
  const onFetchCreditsSucces = (responseData) => {
    const director = responseData?.crew?.filter((crewMember) => crewMember.job === 'Director')[0];
    const actors = responseData?.cast || [];
    const leadActors = [];
    for (let i = 0; i < actors.length; i++) {
      if (leadActors.length === 4) {
        break;
      }
      if (actors[i]?.order < 5) {
        leadActors.push(actors[i]);
      }
    }
    setDetails((prevDetails) => ({ ...prevDetails, director, leadActors }));
  };
  useEffect(() => {
    performFetch(getDetailsUri(mediaType, showId),
      onFetchDetailsSuccess);
    performFetch(getVideoUri(mediaType, showId), onFetchVideosSuccess);
    performFetch(getCreditsUri(mediaType, showId), onFetchCreditsSucces);
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
        <div className={style.gradient}>
          <PosterImg
            posterPath={details?.posterPath}
            title={details?.title}
            className={style.posterImg}

          />
        </div>

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

        <div className={style.summery}>

          {details?.overview}

        </div>
        <div className={style.cast}>
          <span>
            {details.director ? `Director: ${details.director.name}` : ''}
          </span>
          <br />
          <span>
            {(details?.leadActors?.length > 0)
              ? `Starring: ${details.leadActors.map((a) => a.name).join(', ')}`
              : ''}
          </span>
        </div>

      </div>
    </div>
  );
};


export default ShowDetails;
