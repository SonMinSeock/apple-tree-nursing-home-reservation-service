import styled from "styled-components";
import React from "react";

export const StyleForm = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const Form = ({ children, onSubmit }) => {
  return <StyleForm onSubmit={onSubmit}>{children}</StyleForm>;
};

export default Form;
