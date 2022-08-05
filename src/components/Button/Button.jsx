import { StyledButton } from './StyledButton';

export const Button = ({ loadMore, children }) => {
  return (
    <StyledButton onClick={loadMore} type="button">
      {children}
    </StyledButton>
  );
};
