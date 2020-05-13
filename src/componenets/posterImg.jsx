/* eslint-disable no-param-reassign */
import React from 'react';
import { PosterSizes } from './interfaces';


const PosterImg = ({
  title, posterPath, className, size = PosterSizes.w185, altImg = true
}) => (
    <img
      src={`https://image.tmdb.org/t/p/${size}/${posterPath}`}
      alt={title}
      loading="lazy"
      onError={(ev) => {
        if (altImg) {
          ev.target.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
        }
      }}
      className={className}
    />
  );

export default PosterImg;
