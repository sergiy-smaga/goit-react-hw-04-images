import { StyledList } from './StyledImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => {
  return (
    <>
      <StyledList>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </StyledList>
    </>
  );
};

ImageGallery.propTypes = {
  queryName: PropTypes.string.isRequired,
};
