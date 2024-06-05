import { format, isSaturday, isSunday, isBefore, isAfter, addDays } from "date-fns";
import React from "react";
import styled from "styled-components";

const StyleDaySpan = styled.span`
  padding: 10px;
  position: relative;
  font-weight: 700;

  /* 커서 스타일 설정 */
  cursor: ${(props) => (props.$isUnavailable ? "default" : "pointer")};
`;

function getDayStyle({ currentDate, startDay, selectDate, availableDates }) {
  const startFormattedDate = format(startDay, "yyyy-MM-dd");
  const today = new Date();
  const todayFormatted = format(today, "yyyy-MM-dd");
  const within30Days = isAfter(startDay, today) && isBefore(startDay, addDays(today, 30));
  const isPastDay = isBefore(startDay, today) && startFormattedDate !== todayFormatted;
  const isAvailableDate = availableDates.includes(startFormattedDate);

  if (!isAvailableDate) {
    return { color: "#ddd", isUnavailable: true }; // 예약 불가능한 날짜일 경우 회색 및 이벤트 비활성화
  } else if (format(currentDate, "M") !== format(startDay, "M")) {
    return { color: "#ddd", isUnavailable: false };
  } else if (isPastDay || !within30Days) {
    return { color: "#ddd", isUnavailable: false };
  } else if (startFormattedDate === selectDate) {
    return { color: "#fff", isUnavailable: false };
  } else if (isSaturday(startDay) || isSunday(startDay)) {
    return { color: "#000", isUnavailable: false };
  } else {
    return { color: "#000", isUnavailable: false };
  }
}

function DaySpan({ currentDate, startDay, formattedDay, selectDate, availableDates }) {
  const { color, isUnavailable } = getDayStyle({ currentDate, startDay, selectDate, availableDates });

  return (
    <StyleDaySpan style={{ color: color }} $isUnavailable={isUnavailable}>
      {formattedDay}
    </StyleDaySpan>
  );
}

export default DaySpan;
