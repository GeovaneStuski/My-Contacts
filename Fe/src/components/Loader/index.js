import PropTypes from 'prop-types';
import ReactPortals from '../ReactPortals';

import { Overlay } from './styles';

import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

import Spinner from '../Spinner';

export default function Loader({ isLoading }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortals containerId="loader-root">
      <Overlay $isLeaving={!isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortals>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
