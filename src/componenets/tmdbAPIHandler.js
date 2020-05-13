
import { MediaTypes } from './interfaces';


const normalizeTmdbMovie = (movieEntry) => {
  const {
    title,
    release_date: releaseDate,
    vote_average: voteAverage,
    ...restOfMovieKeys
  } = movieEntry;
  return {
    releaseDate,
    title,
    voteAverage,
    ...restOfMovieKeys
  };
};

const normalizeTmdbTvShow = (tvEntry) => {
  const {
    name: title,
    first_air_date: releaseDate,
    vote_average: voteAverage,
    episode_run_time: runtime,
    ...restOfMovieKeys
  } = tvEntry;
  return {
    releaseDate,
    title,
    voteAverage,
    runtime: Array.isArray(runtime) ? runtime[0] : runtime,
    ...restOfMovieKeys
  };
};

export const normalizeTmdbResult = (mediaType, entry) => (
  {
    mediaType,
    ...mediaType === MediaTypes.Movie
      ? normalizeTmdbMovie(entry)
      : normalizeTmdbTvShow(entry)
  }
);

export const normalizeSearchResults = (responseResults) => {
  const tvAndMovieResults = responseResults
    .filter(
      (entry) => (entry.media_type === MediaTypes.Movie
        || entry.media_type === MediaTypes.TV)
    );
  return tvAndMovieResults
    .map((entry) => normalizeTmdbResult(entry.media_type, entry));
};

export const normalizeDiscoverResults = (currentMediaType, responseResults) => responseResults
  .map((entry) => normalizeTmdbResult(currentMediaType, entry));


export const tmdbApiBaseUrl = 'https://api.themoviedb.org/3/';


export const appendApiKeyParam = (url) => (url.includes('?')
  ? `${url}&api_key=${process.env.TMDB_API_KEY}`
  : `${url}?api_key=${process.env.TMDB_API_KEY}`);


export const getDiscoverUri = (type = 'movie', sortBy = 'popularity.desc', page = 1) => {
  const url = `${tmdbApiBaseUrl}discover/${type}?page=${page}&sort_by=${sortBy}&include_adult=false&include_video=false`;
  return appendApiKeyParam(url);
};

export const getSearchUri = (query, page = 1) => {
  const url = `${tmdbApiBaseUrl}search/multi?page=${page}&query=${query}&include_adult=false`;
  return appendApiKeyParam(url);
};


export const getDetailsUri = (mediaType, id) => appendApiKeyParam(
  `${tmdbApiBaseUrl}${mediaType}/${id}`
);
export const getCreditsUri = (mediaType, id) => appendApiKeyParam(
  `${tmdbApiBaseUrl}${mediaType}/${id}/credits`
);

export const getVideoUri = (mediaType, id) => appendApiKeyParam(
  `${tmdbApiBaseUrl}${mediaType}/${id}/videos`
);
