import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
`;

export const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0, 0.6);
  backdrop-filter: blur(7px);
  animation: ${fadeIn} .3s;
  ${({ $onLeaving }) => $onLeaving && css`
    animation: ${fadeOut} .2s forwards;
  `}

`;
export const Container = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
  animation: ${scaleIn} .3s;
  ${({ $onLeaving }) => $onLeaving && css`
    animation: ${scaleOut} .2s forwards;
  `}

  > h1 {
    font-size: 22px;
    color: ${({ theme, $danger }) => (
    $danger ? theme.colors.danger.main : theme.colors.gray[900]
  )}
  };

  .children-body {
    margin: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .cancel-button {
    background-color: transparent;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-right: 24px;
    font-size: 15px;

    &:disabled {
      color: ${({ theme }) => theme.colors.gray[200]};
      cursor: auto;
    }
  }
`;
