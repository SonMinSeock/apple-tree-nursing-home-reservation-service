import { isToday } from "date-fns";
import React from "react";
import styled from "styled-components";

function DayBox({ days }) {
  const StyleDayBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 4.3rem;
  `;
  return <StyleDayBox>{days}</StyleDayBox>;
}

export default DayBox;
