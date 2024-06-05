import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  background-color: #d9d9d9;
  border: 0;
  padding: 1rem 0;
  color: #ffffff;
  max-width: 540px;
  &.activate {
    background-color: #78d6bb;
    cursor: pointer;
  }
`;
