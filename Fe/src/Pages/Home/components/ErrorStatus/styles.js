import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  .details {
    margin-left: 24px;
    span {
      color: ${({ theme }) => theme.colors.danger.main};
      font-size: 22px;
      display: block;
      margin-bottom: 8px;
    }
  }
`;
