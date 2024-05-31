import React from "react";
import styled from "styled-components";

const StyleHeader = styled.header`
  padding: 1rem;
`;

const Header = ({ children }) => {
  return <StyleHeader>{children}</StyleHeader>;
};

export default Header;
