import React, { useState } from "react";
import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { addDays, subDays, startOfWeek, endOfWeek, format } from "date-fns";
import ko from "date-fns/locale/ko";

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px 0;
`;

const ArrowButton = styled.button`
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
`;

const DateRange = styled.div`
  font-size: 18px;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(7, 1fr);
  grid-template-rows: 50px 50px repeat(5, auto);
  width: 100%;
  max-width: 1200px;
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: auto;
`;

const TableCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: ${(props) => (props.header ? "#f5e59e" : "white")};
  color: ${(props) => (props.$saturday ? "blue" : props.$sunday ? "red" : "black")};
  font-weight: ${(props) => (props.header ? "bold" : "normal")};
  grid-column: ${(props) => (props.colSpan ? `span ${props.colSpan}` : "auto")};
`;

const DayCell = styled(TableCell)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
`;

const DateText = styled.div`
  background-color: #f5e59e;
  width: 100%;
  text-align: center;
  font-weight: bold;
`;

const DayText = styled.div`
  padding: 5px 0;
`;
const OutingReservationTable = () => {
  const days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
  const times = ["오전 10:30", "오전 11:00", "오후 14:00", "오후 14:30", "오후 15:00", "오후 15:30", "오후 16:00"];
  const reservations = [
    { day: 0, time: 0, content: "n층 000(딸)" },
    { day: 0, time: 0, content: "n층 000(아들)" },
    { day: 0, time: 1, content: "n층 000(딸)" },
    { day: 3, time: 3, content: "n층 000(딸)" },
  ];

  // Create a nested structure to store multiple reservations for each time slot
  const reservationSlots = Array(times.length)
    .fill()
    .map(() =>
      Array(days.length)
        .fill()
        .map(() => [])
    );

  reservations.forEach((reservation) => {
    reservationSlots[reservation.time][reservation.day].push(reservation.content);
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevWeek = () => {
    setCurrentDate((prevDate) => subDays(prevDate, 7));
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => addDays(prevDate, 7));
  };

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // 이번주 시작 요일(월요일)
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 }); // 이번주 마지막 요일(일요일)

  const dates = Array.from({ length: 7 }, (_, i) => format(addDays(startDate, i), "yyyy-MM-dd", { locale: ko }));
  return (
    <>
      <NavigationContainer>
        <ArrowButton onClick={handlePrevWeek}>
          <FaAngleLeft size={28} />
        </ArrowButton>
        <DateRange>
          {format(startDate, "yyyy-MM-dd", { locale: ko })} ~ {format(endDate, "yyyy-MM-dd", { locale: ko })}
        </DateRange>
        <ArrowButton onClick={handleNextWeek}>
          <FaAngleRight size={28} />
        </ArrowButton>
      </NavigationContainer>
      <Table>
        <TableCell header="true">시간</TableCell>
        {days.map((day, index) => (
          <DayCell
            key={index}
            header="true"
            $saturday={index === 5 ? true : false}
            $sunday={index === 6 ? true : false}
          >
            <DateText>{dates[index]}</DateText>
            <DayText>{day}</DayText>
          </DayCell>
        ))}
        {times.map((time, timeIndex) => (
          <React.Fragment key={timeIndex}>
            <TableCell header="true">{time}</TableCell>
            {days.map((_, dayIndex) => {
              const slot = reservationSlots[timeIndex][dayIndex];
              return (
                <TableCell key={`${dayIndex}-${timeIndex}`}>
                  {slot.map((content, index) => (
                    <div key={index}>{content}</div>
                  ))}
                </TableCell>
              );
            })}
          </React.Fragment>
        ))}
      </Table>
    </>
  );
};

export default OutingReservationTable;
