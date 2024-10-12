import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(246,245,252, 0.7);
  animation: ${fadeIn} .3s forwards;

  ${({ $isLeaving }) => $isLeaving && css`
    animation: ${fadeOut} .3s forwards;
  `}

`;
