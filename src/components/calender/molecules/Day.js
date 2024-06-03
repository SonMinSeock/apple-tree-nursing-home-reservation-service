import { isToday, isSameMonth, isAfter, format, addDays } from "date-fns";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DaySpan from "../atoms/DaySpan"; // DaySpan 컴포넌트의 경로에 맞게 수정
import axios from "axios"; // 예약 가능한 날짜를 가져오기 위한 HTTP 요청 라이브러리

const StyleDay = styled.div`
  width: 14.28%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.$isSelectDay ? "#78D6BB" : "transparent")};
  border-radius: 0.3rem;

  pointer-events: ${(props) => (props.$isPastDay ? "none" : "auto")};
`;

function Day({ currentDate, startDay, formattedDate, formattedDay, setSelectDate, selectDate }) {
  const [availableDates, setAvailableDates] = useState([
    "2024-06-03",
    "2024-06-05",
    "2024-06-06",
    "2024-06-07",
    "2024-06-08",
    "2024-06-10",
    "2024-06-11",
  ]);

  // useEffect(() => {
  //   // 예약 가능한 날짜를 백엔드에서 가져오는 HTTP 요청
  //   axios.get("/api/available-dates")
  //     .then(response => {
  //       // 받아온 데이터를 상태로 설정
  //       setAvailableDates(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching available dates:", error);
  //     });
  // }, []);

  const today = new Date();
  const todayFormatted = format(today, "yyyy-MM-dd");
  const todayPlus30 = addDays(today, 30);
  const isTodayDate = isToday(startDay);
  const sameMonth = isSameMonth(currentDate, startDay);
  const isPastDay = !isAfter(startDay, today) && !isTodayDate;

  const onSelectDay = () => {
    if (!isPastDay && sameMonth && availableDates?.includes(formattedDate)) {
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
      <DaySpan
        currentDate={currentDate}
        startDay={startDay}
        formattedDay={formattedDay}
        selectDate={selectDate}
        availableDates={availableDates}
      />
    </StyleDay>
  );
}

export default Day;
