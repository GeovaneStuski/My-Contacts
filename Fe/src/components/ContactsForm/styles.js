import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;

  button {
    margin-top: 24px;
  }

  .select-container {
    display: flex;
    align-items: center;

    button {
      width: 32px;
      margin: 0;
      outline: none;
      border: none;
      background-color: transparent;
      display: flex;
      margin-left: 6px;
      justify-content: center;
      align-items: center;
      transition: opacity .2s ease-in;
      color: red;

      img {
        width: 90%;
      }

      &:hover {
        opacity: .9;
      }
    }
  }
`;
