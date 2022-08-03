import { Component } from 'react';
import { StyledOverlay, StyledModal } from './StyledModal';

export class Modal extends Component {
  render() {
    return (
      <StyledOverlay>
        <StyledModal>
          <img src="" alt="" />
        </StyledModal>
      </StyledOverlay>
    );
  }
}
