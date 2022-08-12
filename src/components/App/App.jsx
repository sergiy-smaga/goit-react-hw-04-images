import { AppStyled } from './StyledApp';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { getImages } from 'service/api';
import { Loader } from 'components/Loader/Loader';
import { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const firstSearch = useRef(true);

  useEffect(() => {
    if (firstSearch.current) {
      firstSearch.current = false;
      return;
    }
    if (query === '') {
      return;
    }

    async function foo() {
      try {
        setIsLoading(true);
        const response = await getImages(query, page);
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
  }, [page, query]);

  const handleSubmit = newQuery => {
    if (query === newQuery || newQuery.trim() === '') {
      Notify.failure('Nothing to search');
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  return (
    <AppStyled>
      <Searchbar handleSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {images.length !== 0 && !isLoading && (
        <Button loadMore={() => setPage(prev => prev + 1)}>Load more</Button>
      )}
      {isLoading && <Loader />}
    </AppStyled>
  );
};
