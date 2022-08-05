import { Component } from 'react';
import {
  HeaderStyled,
  StyledForm,
  StyledButton,
  StyledSpan,
  StyledInput,
} from './StyledSearchbar';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInput = e => {
    this.setState({ query: e.target.value });
  };

  formSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <HeaderStyled>
        <StyledForm onSubmit={this.formSubmit}>
          <StyledButton type="submit">
            <StyledSpan>Search</StyledSpan>
          </StyledButton>

          <StyledInput
            onChange={this.handleInput}
            value={this.state.query}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </StyledForm>
      </HeaderStyled>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
