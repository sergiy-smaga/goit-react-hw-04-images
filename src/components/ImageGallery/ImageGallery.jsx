import { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { StyledList } from './StyledImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { getImages } from 'service/api';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

export const ImageGallery = ({ queryName }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const firstSearch = useRef(true);

  useEffect(() => {
    setPage(1);
    setImages([]);
  }, [queryName]);

  useEffect(() => {
    if (firstSearch.current) {
      firstSearch.current = false;
      return;
    }
    if (queryName === '') {
      return;
    }

    async function foo() {
      try {
        setIsLoading(true);
        const response = await getImages(queryName, page);
        if (response.length === 0) {
          Notify.failure('Nothing founded');
          setIsLoading(false);
          return;
        }
        setImages(prevImages => [...prevImages, ...response]);
        setIsLoading(false);
      } catch (error) {
        Notify.failure(error.message);
      }
    }
    foo();
  }, [page, queryName]);

  return (
    <>
      <StyledList>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </StyledList>
      {images.length !== 0 && !isLoading && (
        <Button loadMore={() => setPage(prev => prev + 1)}>Load more</Button>
      )}
      {isLoading && <Loader />}
    </>
  );
};

ImageGallery.propTypes = {
  queryName: PropTypes.string.isRequired,
};
