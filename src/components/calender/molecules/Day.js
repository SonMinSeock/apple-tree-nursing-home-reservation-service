import { isToday, isSameMonth, isAfter, format, addDays } from "date-fns";
import React from "react";
import styled from "styled-components";
import DaySpan from "../atoms/DaySpan"; // DaySpan 컴포넌트의 경로에 맞게 수정

const StyleDay = styled.div`
  width: 14.28%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.$isSelectDay ? "#78D6BB" : "transparent")};
  border-radius: 0.3rem;
  cursor: ${(props) => (props.$isPastDay ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.$isPastDay ? "none" : "auto")};
`;

function Day({ currentDate, startDay, formattedDate, formattedDay, setSelectDate, selectDate }) {
  const today = new Date();
  const todayFormatted = format(today, "yyyy-MM-dd");
  const todayPlus30 = addDays(today, 30);
  const isTodayDate = isToday(startDay);
  const sameMonth = isSameMonth(currentDate, startDay);
  const isPastDay = !isAfter(startDay, today) && !isTodayDate;

  const onSelectDay = () => {
    if (!isPastDay && sameMonth) {
      setSelectDate(formattedDate);
    }
  };

  return (
    <StyleDay
      $isToday={isTodayDate}
      $isSelectDay={formattedDate === selectDate}
      $isPastDay={isPastDay}
      onClick={onSelectDay}
    >
      <DaySpan currentDate={currentDate} startDay={startDay} formattedDay={formattedDay} selectDate={selectDate} />
    </StyleDay>
  );
}

export default Day;
