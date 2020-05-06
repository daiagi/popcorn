/* eslint-disable no-param-reassign */
import React from 'react';
import { PosterSizes } from './interfaces';


const PosterImg = ({
  title, posterPath, className, size = PosterSizes.w185
}) => (
    <img
      src={`https://image.tmdb.org/t/p/${size}/${posterPath}`}
      alt={title}
      onError={(ev) => {
        ev.target.src = 'https://www.ice-shop.dk/media/catalog/product/cache/1/image/378x380/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/no_image_placeholder_6.png';
      }}
      className={className}
    />
  );

export default PosterImg;
