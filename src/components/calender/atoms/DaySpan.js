import { format, isSaturday, isSunday, isToday } from "date-fns";
import React from "react";
import styled from "styled-components";

const StyleDaySpan = styled.span`
  padding: 10px;
  position: relative;
  font-weight: 700;
`;
function DaySpan({ currentDate, startDay, formattedDay }) {
  return (
    <StyleDaySpan
      style={{
        color:
          // 현재 날짜가 이번 달의 데이터가 아닐 경우 회색으로 표시
          // date-fns의 함수를 사용해 일요일이면 빨간색, 토요일이면 파란색으로 표시
          // 나머지 날짜는 이번 달의 정상적인 데이터이므로 검은색으로 표시
          format(currentDate, "M") !== format(startDay, "M")
            ? "#ddd"
            : isSunday(startDay)
            ? "red"
            : isSaturday(startDay)
            ? "blue"
            : isToday(startDay) // 현재 날짜인지 확인하여 초록색으로 표시
            ? "#fff"
            : "#000",
      }}
    >
      {formattedDay}
    </StyleDaySpan>
  );
}

export default DaySpan;
