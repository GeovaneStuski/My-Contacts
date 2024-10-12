import styled from 'styled-components';

export const Container = styled.div`
  small {
    color: ${({ theme }) => theme.colors.danger.main}
  }
  & + & {
    margin-top: 16px;
  }
  .form-itens {
    position: relative;
    .loader {
      position: absolute;
      top: 18px;
      right: 56px;
    }
  }
`;
