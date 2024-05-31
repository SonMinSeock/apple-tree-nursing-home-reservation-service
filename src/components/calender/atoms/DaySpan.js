import { format, isSaturday, isSunday, isToday } from "date-fns";
import React from "react";
import styled from "styled-components";

const StyleDaySpan = styled.span`
  padding: 10px;
  position: relative;
  font-weight: 700;
`;
function DaySpan({ currentDate, startDay, formattedDay, selectDate }) {
  const startFormattedDate = format(startDay, "yyyy-MM-dd");

  return (
    <StyleDaySpan
      style={{
        color:
          // 현재 날짜가 이번 달의 데이터가 아닐 경우 회색으로 표시
          format(currentDate, "M") !== format(startDay, "M")
            ? "#ddd"
            : isSunday(startDay)
            ? "red"
            : isSaturday(startDay)
            ? "blue"
            : startFormattedDate === selectDate // 선택한 날짜는 하얀색 글자
            ? "#fff"
            : "#000", // 나머지 날짜는 검은색 글자
      }}
    >
      {formattedDay}
    </StyleDaySpan>
  );
}

export default DaySpan;
