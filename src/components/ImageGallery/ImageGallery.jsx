import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { StyledList } from './StyledImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { getImages } from 'service/api';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

export const ImageGallery = ({ queryName }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  // const firstSearch = useRef(true);

  useEffect(() => {
    // if (firstSearch.current) {
    //   firstSearch.current = false;
    //   return;
    // }
    if (queryName === '') {
      Notify.failure('Nothing to search');
      return;
    }
    setIsLoading(true);
    setPage(1);
    setImages([]);

    async function foo() {
      try {
        const response = await getImages(queryName);
        if (response.length === 0) {
          Notify.failure('Nothing founded');
          setIsLoading(false);
          return;
        }
        setImages(response);
        setIsLoading(false);
      } catch (error) {
        Notify.failure(error.message);
      }
    }
    foo();
  }, [queryName]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setIsLoading(true);

    async function foo() {
      try {
        const response = await getImages(queryName, page);
        if (response.length === 0) {
          Notify.failure('Images have finished');
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
  }, [page]);

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
