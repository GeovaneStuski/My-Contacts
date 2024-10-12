import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;
const fadeOut = keyframes`
  from {
     opacity: 1;
    transform: translateY(0px);
  }

  to {
    opacity: 0;
    transform: translateY(100px);
  }

`;

const containerVariants = {
  default: css`
    background-color: ${({ theme }) => theme.colors.primary.main};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.success.main};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger.main};
  `,
};

export const Container = styled.div`
  padding: 16px 32px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  animation: ${fadeIn} .3s forwards;

  ${({ $isLeaving }) => $isLeaving && css`
    animation: ${fadeOut} .3s forwards;
  `}

  ${({ type }) => containerVariants[type] || containerVariants.default}

  img {
    margin-right: 8px;
  }

  & + & {
    margin-top: 16px;
  }
`;
