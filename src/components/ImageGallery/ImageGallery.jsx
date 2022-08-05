import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { StyledList } from './StyledImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { getImages } from 'service/api';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
    // error: false,
    // message: '',
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { queryName } = this.props;
    const { page } = this.state;
    const pageInFetch = prevProps.queryName !== queryName ? 1 : page;

    if (prevProps.queryName !== queryName || prevState.page !== page) {
      if (queryName === '') {
        Notify.failure('Nothing to search');
        // this.setState({ message: 'Nothing to search', error: true });
        return;
      }

      try {
        this.setState({ isLoading: true });
        const response = await getImages(queryName, pageInFetch);

        if (response.length === 0) {
          Notify.failure('Nothing founded');

          this.setState({
            isLoading: false,
            // message: 'Nothing founded',
            // error: true,
          });
          return;
        }

        if (prevProps.queryName !== queryName) {
          this.setState({ images: response, page: 1 });
        }

        if (prevState.page !== page && page !== 1) {
          this.setState(state => ({
            images: [...state.images, ...response],
          }));
        }

        this.setState({ isLoading: false });
      } catch (error) {
        Notify.failure(error.message);
        // this.setState({
        //   error: true,
        //   isLoading: false,
        //   message: error.message,
        // });
      }
    }
  };

  onLoadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        {/* {error && Notify.failure(message)} */}
        <StyledList>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </StyledList>
        {images.length !== 0 && !isLoading && (
          <Button loadMore={this.onLoadMore}>Load more</Button>
        )}
        {isLoading && <Loader />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  queryName: PropTypes.string.isRequired,
};
