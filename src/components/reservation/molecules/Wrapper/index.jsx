import React from "react";
import styled from "styled-components";

const StyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Wrapper = ({ children }) => {
  return <StyleWrapper>{children}</StyleWrapper>;
};

export default Wrapper;
