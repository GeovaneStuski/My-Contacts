import PropTypes from 'prop-types';

import { StyledButton } from './styles';

import Spinner from '../Spinner';

export default function Button({
  type = 'button',
  disabled = false,
  danger = false,
  isLoading = false,
  children,
  onClick,
}) {
  return (
    <StyledButton
      onClick={onClick}
      $danger={danger.toString()}
      type={type}
      disabled={disabled || isLoading}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};
