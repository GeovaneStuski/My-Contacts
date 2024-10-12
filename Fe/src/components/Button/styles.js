import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  border: none;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: 8px 16px;
  font-size: 16px;
  color: #fff;
  border-radius: 4px;
  transition: background .2s ease-in;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background-color: #ccc !important;
    cursor: default !important;
  }

  ${({ theme, $danger }) => $danger === 'true' && css`
      background: ${theme.colors.danger.main};

      &:hover {
        background-color: ${theme.colors.danger.light};
      }

      &:active {
        background-color: ${theme.colors.danger.dark};
      }
    `}
`;
