import { isToday, isSameMonth, isAfter, format } from "date-fns";
import React from "react";
import styled from "styled-components";
import DaySpan from "../atoms/DaySpan"; // DaySpan 컴포넌트의 경로에 맞게 수정

const StyleDay = styled.div`
  width: 14.28%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.$isSelectDay ? "yellow" : props.$isToday ? "#03a95a" : "transparent")};
  border-radius: 1rem;
  cursor: ${(props) => (props.$isPastDay ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.$isPastDay ? "none" : "auto")};
`;

function Day({ currentDate, startDay, formattedDate, formattedDay, setSelectDate, selectDate }) {
  const today = isToday(startDay);
  const sameMonth = isSameMonth(currentDate, startDay);
  const isPastDay = !isAfter(startDay, currentDate) && !today;

  const onSelectDay = () => {
    if (!isPastDay && sameMonth) {
      setSelectDate(formattedDate);
    }
  };

  return (
    <StyleDay $isToday={today} $isSelectDay={formattedDate === selectDate} $isPastDay={isPastDay} onClick={onSelectDay}>
      <DaySpan currentDate={currentDate} startDay={startDay} formattedDay={formattedDay} />
    </StyleDay>
  );
}

export default Day;
