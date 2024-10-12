import PropTypes from 'prop-types';

// import { useEffect, useState } from 'react';
import ReactPortals from '../ReactPortals';

import {
  Overlay, Container, Footer,
} from './styles';

import Button from '../Button';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

export default function Modal({
  danger = false,
  visible,
  isLoading = false,
  onCancel,
  onConfirm,
  title,
  children,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirmar',
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortals>
      <Overlay $onLeaving={!visible} ref={animatedElementRef}>
        <Container $danger={danger} $onLeaving={!visible}>
          <h1>{title}</h1>

          <div className="children-body">
            {children}
          </div>

          <Footer>
            <button
              className="cancel-button"
              onClick={onCancel}
              type="button"
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortals>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
};
