import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  height: 52px;
  border: 2px solid #fff;
  outline: none;
  background-color: #fff;
  padding: 0 16px;
  font-size: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);
  border-radius: 4px;
  transition: border-color .2s ease-in;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[200]};
  }

  ${({ theme, $error }) => $error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}

  &[Disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;
