import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 32px;

  input {
    width: 100%;
    height: 50px;
    background-color: #fff;
    outline: none;
    border: none;
    border-radius: 25px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.04);
    padding: 0 16px;

    &::placeholder {
      color: #BCBCBC;
    }
  }
`;
