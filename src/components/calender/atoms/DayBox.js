import React from "react";
import styled from "styled-components";

const StyleDayBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 4.3rem;
`;

function DayBox({ days }) {
  return <StyleDayBox>{days}</StyleDayBox>;
}

export default DayBox;
