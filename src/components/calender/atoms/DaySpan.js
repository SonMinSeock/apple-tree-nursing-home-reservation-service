import { format, isSaturday, isSunday, isBefore, isAfter, addDays } from "date-fns";
import React from "react";
import styled from "styled-components";

const StyleDaySpan = styled.span`
  padding: 10px;
  position: relative;
  font-weight: 700;
`;

function DaySpan({ currentDate, startDay, formattedDay, selectDate }) {
  const startFormattedDate = format(startDay, "yyyy-MM-dd");
  const today = new Date();
  const todayFormatted = format(today, "yyyy-MM-dd");
  const within30Days = isAfter(startDay, today) && isBefore(startDay, addDays(today, 30));
  const isPastDay = isBefore(startDay, today) && startFormattedDate !== todayFormatted;

  return (
    <StyleDaySpan
      style={{
        color:
          // 현재 날짜가 이번 달의 데이터가 아닐 경우 회색으로 표시
          format(currentDate, "M") !== format(startDay, "M")
            ? "#ddd"
            : isPastDay
            ? "#ddd"
            : startFormattedDate === selectDate // 선택한 날짜는 흰색
            ? "#fff"
            : isSaturday(startDay) || isSunday(startDay) // 토요일, 일요일은 검은색
            ? "#000"
            : within30Days // 오늘부터 30일 후까지는 검은색
            ? "#000"
            : "#000", // 그 외의 날짜도 검은색
      }}
    >
      {formattedDay}
    </StyleDaySpan>
  );
}

export default DaySpan;
