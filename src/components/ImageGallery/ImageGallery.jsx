import { Component } from 'react';
import { StyledList } from './StyledImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

const API_KEY = '28129129-feff09d42f949c4b372c861bc';

export class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    page: 1,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.queryName !== this.props.queryName) {
      fetch(
        `https://pixabay.com/api/?q=${this.props.queryName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          } else throw Error('Bad response');
        })
        .then(response => {
          this.setState({ images: response.hits });
        })
        .catch(err => console.log(err.message));
    }
  };

  render() {
    return (
      <StyledList>
        {this.state.images.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </StyledList>
    );
  }
}
