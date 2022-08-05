import { ThreeCircles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ThreeCircles
      wrapperStyle={{ justifyContent: 'center' }}
      height="50"
      color="#3f51b5"
    />
  );
};
