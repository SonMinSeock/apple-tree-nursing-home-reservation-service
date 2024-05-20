import { isToday } from "date-fns";
import React from "react";
import styled from "styled-components";
import DaySpan from "../atoms/DaySpan";

function Day({ currentDate, startDay, formattedDate }) {
  const StyleDay = styled.div`
    width: 14.28%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${isToday(startDay) && "#03a95a"};
    border-radius: 1rem;
  `;
  return (
    <StyleDay>
      <DaySpan currentDate={currentDate} startDay={startDay} formattedDate={formattedDate} />
    </StyleDay>
  );
}

export default Day;
