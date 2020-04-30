import fetchRetry from 'fetch-retry';
import fetchWithTimeout from '../utils';


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
        ...restOfMovieKeys
    } = tvEntry;
    return {
        releaseDate,
        title,
        voteAverage,
        ...restOfMovieKeys
    };
};

export const normalizeTmdbResult = (isMovie) => (entry) => (
    isMovie
        ? normalizeTmdbMovie(entry)
        : normalizeTmdbTvShow(entry)
);


export const tmdbApiBaseUrl = 'https://api.themoviedb.org/3/';
const retryFetch = fetchRetry(fetchWithTimeout(600), {
    retries: 10,
    retryDelay: 500
});


export const appendApiKeyParam = (url) => (url.includes('?')
    ? `${url}&api_key=${process.env.TMDB_API_KEY}`
    : `${url}?api_key=${process.env.TMDB_API_KEY}`);


export const getDiscoverUri = (type = 'movie', sortBy = 'popularity.desc', page = 1) => {
    const url = `${tmdbApiBaseUrl}discover/${type}/?page=${page}&sort_by=${sortBy}&include_adult=false&include_video=false`;
    return appendApiKeyParam(url);
};

export const getSearchUri = (type = 'movie', query, page = 1) => {
    const url = `${tmdbApiBaseUrl}search/${type}/?page=${page}&query=${query}&include_adult=false`;
    return appendApiKeyParam(url);
};


export const performFetch = (url, onSuccess) => retryFetch(url)
    .then((response) => response.json())
    .then(onSuccess);
