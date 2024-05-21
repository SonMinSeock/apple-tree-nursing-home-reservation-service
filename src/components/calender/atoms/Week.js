import React from "react";
import styled from "styled-components";

const StyleWeek = styled.div`
  width: 14.28%;
  color: #8f8f8f;
  display: flex;
  justify-content: center;
  padding: 10px;
`;
function Week({ children }) {
  return <StyleWeek>{children}</StyleWeek>;
}

export default Week;
