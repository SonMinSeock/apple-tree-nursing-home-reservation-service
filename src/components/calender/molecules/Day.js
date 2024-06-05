// import { isToday, isSameMonth, isAfter, format, addDays, getMonth } from "date-fns";
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import DaySpan from "../atoms/DaySpan";

// const StyleDay = styled.div`
//   width: 14.28%;
//   height: 70%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   background-color: ${(props) => (props.$isSelectDay ? "#78D6BB" : "transparent")};
//   border-radius: 0.3rem;
//   pointer-events: ${(props) => (props.$isPastDay ? "none" : "auto")};
// `;

// function Day({ reservation, currentDate, startDay, formattedDate, formattedDay, setSelectDate, selectDate }) {
//   const today = new Date();
//   const tomorrow = addDays(today, 1);
//   const after30Days = addDays(today, 30);
//   const currentMonth = getMonth(today) + 1;
//   const formattedTomorrow = format(tomorrow, "yyyy-MM-dd");
//   const formattedAfter30Days = format(after30Days, "yyyy-MM-dd");

//   const [availableDates, setAvailableDates] = useState([]);

//   const fetchGetReservationDate = async () => {
//     try {
//       const res = await fetch(
//         "https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/reservations/available-dates",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             startDate: formattedTomorrow,
//             endDate: formattedAfter30Days,
//             displayMonth: currentMonth,
//             elderlyId: reservation.elderlyId,
//             reservationType: reservation.type,
//           }),
//         }
//       );
//       if (!res.ok) {
//         throw new Error("Failed to fetch available dates");
//       }
//       const data = await res.json();
//       setAvailableDates(data);
//     } catch (error) {
//       console.error("Error fetching available dates:", error);
//     }
//   };

//   useEffect(() => {
//     fetchGetReservationDate();
//   }, []);

//   const isTodayDate = isToday(startDay);
//   const sameMonth = isSameMonth(currentDate, startDay);
//   const isPastDay = (!isAfter(startDay, today) && !isTodayDate) || isTodayDate;

//   const onSelectDay = () => {
//     if (!isPastDay && sameMonth && availableDates?.includes(formattedDate)) {
//       setSelectDate(formattedDate);
//     }
//   };

//   return (
//     <StyleDay
//       $isToday={isTodayDate}
//       $isSelectDay={formattedDate === selectDate}
//       $isPastDay={isPastDay}
//       onClick={onSelectDay}
//     >
//       <DaySpan
//         currentDate={currentDate}
//         startDay={startDay}
//         formattedDay={formattedDay}
//         selectDate={selectDate}
//         availableDates={availableDates}
//       />
//     </StyleDay>
//   );
// }

// export default Day;

import { isToday, isSameMonth, isAfter, format, addDays } from "date-fns";
import React from "react";
import styled from "styled-components";
import DaySpan from "../atoms/DaySpan";

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

function Day({ currentDate, startDay, formattedDate, formattedDay, selectDate, availableDates, setSelectDate }) {
  const today = new Date();
  const isTodayDate = isToday(startDay);
  const sameMonth = isSameMonth(currentDate, startDay);
  const isPastDay = (!isAfter(startDay, today) && !isTodayDate) || isTodayDate;
  const isSelectedDay = formattedDate === selectDate;
  const isAvailableDate = availableDates.includes(formattedDate);

  const onSelectDay = () => {
    if (!isPastDay && sameMonth && isAvailableDate) {
      setSelectDate(formattedDate);
    }
  };

  return (
    <StyleDay $isToday={isTodayDate} $isSelectDay={isSelectedDay} $isPastDay={isPastDay} onClick={onSelectDay}>
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
