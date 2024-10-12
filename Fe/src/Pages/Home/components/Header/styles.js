import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: ${({ $justifycontent }) => $justifycontent};
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
  padding-bottom: 16px;

  strong {
    font-weight: bold;
    font-size: 24px;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary.main};
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all .2s ease-in-out;

    &:hover {
      color: #fff;
      background-color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
