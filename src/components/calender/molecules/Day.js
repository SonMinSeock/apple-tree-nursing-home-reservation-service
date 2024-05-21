import { isToday } from "date-fns";
import React from "react";
import styled from "styled-components";
import DaySpan from "../atoms/DaySpan";

const StyleDay = styled.div`
  width: 14.28%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.$isToday ? "#03a95a" : "transparent")};
  border-radius: 1rem;
`;

function Day({ currentDate, startDay, formattedDate }) {
  const today = isToday(startDay);
  return (
    <StyleDay $isToday={today}>
      <DaySpan currentDate={currentDate} startDay={startDay} formattedDate={formattedDate} />
    </StyleDay>
  );
}

export default Day;
