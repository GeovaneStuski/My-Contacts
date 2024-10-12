import styled from 'styled-components';

export default styled.ul`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateY(90%);
  list-style-type: none;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
  text-align: center;
  padding: 4px;
  border-radius: 4px;

  li {
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      color: #fff;
      background-color: ${({ theme }) => theme.colors.primary.light};
    }
  }
`;
