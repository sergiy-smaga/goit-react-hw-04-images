import { AppStyled } from './StyledApp';
import { useState } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export const App = () => {
  const [query, setQuery] = useState('');

  return (
    <AppStyled>
      <Searchbar setQueryProp={setQuery} />
      <ImageGallery queryName={query} />
    </AppStyled>
  );
};
