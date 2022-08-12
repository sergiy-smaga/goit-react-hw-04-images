import { useState } from 'react';
import {
  HeaderStyled,
  StyledForm,
  StyledButton,
  StyledSpan,
  StyledInput,
} from './StyledSearchbar';
import PropTypes from 'prop-types';

export const Searchbar = ({ setQueryProp }) => {
  const [query, setQuery] = useState('');

  const formSubmit = e => {
    e.preventDefault();
    setQueryProp(query);
    setQuery('');
  };

  return (
    <HeaderStyled>
      <StyledForm onSubmit={formSubmit}>
        <StyledButton type="submit">
          <StyledSpan>Search</StyledSpan>
        </StyledButton>

        <StyledInput
          onChange={e => setQuery(e.target.value)}
          value={query}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </StyledForm>
    </HeaderStyled>
  );
};

Searchbar.propTypes = {
  setQueryProp: PropTypes.func,
};
