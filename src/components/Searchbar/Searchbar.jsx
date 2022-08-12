import { useState } from 'react';
import {
  HeaderStyled,
  StyledForm,
  StyledButton,
  StyledSpan,
  StyledInput,
} from './StyledSearchbar';
import PropTypes from 'prop-types';

export const Searchbar = ({ handleSubmit }) => {
  const [query, setQuery] = useState('');

  const formSubmit = e => {
    e.preventDefault();
    handleSubmit(query);
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
  handleSubmit: PropTypes.func,
};
