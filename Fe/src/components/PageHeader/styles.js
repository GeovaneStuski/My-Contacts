import styled from 'styled-components';

export const Container = styled.header`
  margin-bottom: 24px;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    span {
      font-size: 16px;
      margin-left: 8px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    img {
    transform: rotate(270deg);
    }
  }

  strong {
    font-size: 24px;
  }
`;
