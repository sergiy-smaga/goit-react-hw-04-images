import { AppStyled } from './StyledApp';
import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

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
        <Loader />
        <ImageGallery queryName={this.state.query} />
        <Button />
        <Modal />
      </AppStyled>
    );
  }
}
