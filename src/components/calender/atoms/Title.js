import { format } from "date-fns";
import React from "react";
import styled from "styled-components";

const StyleTitle = styled.div`
  font-size: 27px;
  color: #000;
  font-weight: 700;
  display: flex;
  align-items: center;
`;
function Title({ currentDate }) {
  return (
    <StyleTitle>
      {format(currentDate, "yyyy")}년 {format(currentDate, "M")}월
    </StyleTitle>
  );
}

export default Title;
