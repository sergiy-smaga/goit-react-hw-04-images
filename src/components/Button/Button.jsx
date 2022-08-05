import { StyledButton } from './StyledButton';
import PropTypes from 'prop-types';

export const Button = ({ loadMore, children }) => {
  return (
    <StyledButton onClick={loadMore} type="button">
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
