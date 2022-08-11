import { useState } from 'react';
import { StyledListItem, StyledImage } from './StyledImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  image: { tags, webformatURL, largeImageURL },
}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <StyledListItem>
      <StyledImage
        onClick={() => setIsModalOpened(prev => !prev)}
        src={webformatURL}
        alt={tags}
      />
      {isModalOpened && (
        <Modal onClose={() => setIsModalOpened(prev => !prev)}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </StyledListItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
