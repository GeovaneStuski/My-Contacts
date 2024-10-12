import styled from 'styled-components';

export const ListHeader = styled.header`
margin-top: 24px;
  button {
  outline: none;
  border: none;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.main};
  background-color: transparent;
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
  img {
    transform: ${({ direction }) => (direction === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform .2s ease-in;
  }
}
`;

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 16px;
  border-radius: 4px;

  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .contact-name {
      strong {
        font-size: 16px;
      }

      small {
        margin-left: 8px;
        color: ${({ theme }) => theme.colors.primary.main};
        background-color: ${({ theme }) => theme.colors.primary.lighter};
        padding: 3px 5px;
        border-radius: 4px;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 12px;
      }
    }
    span {
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }
  .actions {
    display: flex;
    align-items: center;
    button {
      margin-left: 8px;
      background-color: transparent;
      outline: none;
      border: none;
    }
  }
  & + & {
    margin-top: 16px;
  }
`;
