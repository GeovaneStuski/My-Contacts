import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import Container from './styles';

export default function DropDown({ visible, onLeave, children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutSide(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onLeave();
      }
    }

    if (visible) {
      document.addEventListener('mousedown', handleClickOutSide);
    } else {
      document.removeEventListener('mousedown', handleClickOutSide);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [visible, onLeave]);

  return (
    <>
      {visible && (
        <Container ref={containerRef} onMouseLeave={onLeave}>
          {children}
        </Container>
      )}
    </>
  );
}

DropDown.propTypes = {
  visible: PropTypes.bool.isRequired,
  onLeave: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
