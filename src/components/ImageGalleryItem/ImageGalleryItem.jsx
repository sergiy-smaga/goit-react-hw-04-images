import { Component } from 'react';
import { StyledListItem, StyledImage } from './StyledImageGalleryItem';

export class ImageGalleryItem extends Component {
  render() {
    const { tags, webformatURL } = this.props.image;
    return (
      <StyledListItem>
        <StyledImage src={webformatURL} alt={tags} />
      </StyledListItem>
    );
  }
}
