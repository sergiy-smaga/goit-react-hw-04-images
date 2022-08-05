import { AppStyled } from './StyledApp';
import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
  };

  handleSubmit = data => {
    this.setState({ query: data });
  };

  render() {
    return (
      <AppStyled>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery queryName={this.state.query} />
      </AppStyled>
    );
  }
}
