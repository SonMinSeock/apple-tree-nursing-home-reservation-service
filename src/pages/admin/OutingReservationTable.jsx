import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { addDays, subDays, startOfWeek, endOfWeek, format, parseISO } from "date-fns";
import ko from "date-fns/locale/ko";
import { useNavigate } from "react-router-dom";

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

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Cell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: ${(props) => (props.header ? "#f5e59e" : "white")};
  color: ${(props) => (props.$saturday ? "blue" : props.$sunday ? "red" : "black")};
  font-weight: ${(props) => (props.header ? "bold" : "normal")};
  cursor: ${(props) => (props.header ? "default" : "pointer")};
  gap: 1rem;
  pointer-events: ${(props) => (props.$clickable ? "auto" : "none")}; /* 셀 클릭 가능 여부 설정 */
  &:hover {
    background-color: ${(props) => (props.$clickable ? "#f0f0f0" : "white")};
  }
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
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
  const times = ["오전 10:30", "오전 11:00", "오후 14:00", "오후 14:30", "오후 15:00", "오후 15:30", "오후 16:00"];

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });

  const formatedStartDate = format(startDate, "yyyy-MM-dd", { locale: ko });
  const formatedEndDate = format(endDate, "yyyy-MM-dd", { locale: ko });

  const dates = Array.from({ length: 7 }, (_, i) => format(addDays(startDate, i), "yyyy-MM-dd", { locale: ko }));

  const fetchGetReservations = async () => {
    try {
      const res = await fetch(
        "https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/reservations/date-range",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start: formatedStartDate,
            end: formatedEndDate,
            reservationType: "OUTING",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch visit reservations");
      }

      const data = await res.json();
      setReservations(data);
    } catch (error) {
      alert("Failed to fetch visit reservations");
    }
  };
  useEffect(() => {
    fetchGetReservations();
    /*
    const fakeData = [
      {
        floor: 4,
        elderlyName: "홍길동1",
        guardianRelation: "minseo",
        reservationDate: "2024-06-03",
        reservationTime: "15:00:00",
        meal: "INSIDE",
      },
      {
        floor: 2,
        elderlyName: "홍길동2",
        guardianRelation: "아들",
        reservationDate: "2024-06-03",
        reservationTime: "16:00:00",
        meal: "OUTSIDE",
      },
      {
        floor: 2,
        elderlyName: "홍길동3",
        guardianRelation: "자녀",
        reservationDate: "2024-06-03",
        reservationTime: "16:00:00",
        meal: "OUTSIDE",
      },
      {
        floor: 3,
        elderlyName: "홍길동4",
        guardianRelation: "자녀",
        reservationDate: "2024-06-05",
        reservationTime: "14:00:00",
        meal: "OUTSIDE",
      },
    ];*/
    //setReservations(fakeData);
  }, [formatedStartDate, formatedEndDate]);

  const reservationSlots = Array(times.length) // 5 X 7 사이즈 배열
    .fill()
    .map(() =>
      Array(days.length)
        .fill()
        .map(() => [])
    );

  reservations.forEach((reservation) => {
    const date = parseISO(reservation.reservationDate);
    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
    const timeIndex = times.findIndex(
      (time) => time.split(" ")[1].split(":")[0] === reservation.reservationTime.split(":")[0]
    );
    console.log(timeIndex);
    if (dayIndex !== -1 && timeIndex !== -1) {
      reservationSlots[timeIndex][dayIndex].push(reservation);
    }
  });

  const handlePrevWeek = () => {
    setCurrentDate((prevDate) => subDays(prevDate, 7));
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => addDays(prevDate, 7));
  };

  return (
    <>
      <NavigationContainer>
        <ArrowButton onClick={handlePrevWeek}>
          <FaAngleLeft size={28} />
        </ArrowButton>
        <DateRange>{`${formatedStartDate} ~ ${formatedEndDate}`}</DateRange>
        <ArrowButton onClick={handleNextWeek}>
          <FaAngleRight size={28} />
        </ArrowButton>
      </NavigationContainer>
      <TableContainer>
        <Row>
          <Cell header="true">시간</Cell>
          {days.map((day, index) => (
            <Cell key={index} header="true" $saturday={index === 5} $sunday={index === 6}>
              <DateText>{dates[index]}</DateText>
              <DayText>{day}</DayText>
            </Cell>
          ))}
        </Row>
        {times.map((time, timeIndex) => (
          <Row key={timeIndex}>
            <Cell header="true">{time}</Cell>
            {days.map((_, dayIndex) => {
              const slots = reservationSlots[timeIndex][dayIndex];

              return (
                <Cell
                  key={`${dayIndex}-${timeIndex}`}
                  onClick={() =>
                    navigate("/admin/reservation-detail", {
                      state: { type: "외출", reservations: slots, date: dates[dayIndex], day: days[dayIndex] },
                    })
                  }
                  $clickable={slots.length > 0}
                >
                  {/* 예약이 있는 경우에만 이름을 표시합니다. */}
                  {slots.length > 0 ? (
                    slots.map((reservation, index) => (
                      <div key={index}>{`${reservation.elderlyName} (${reservation.floor}층)`}</div>
                    ))
                  ) : (
                    // 예약이 없는 경우에는 빈 칸을 표시합니다.
                    <div>-</div>
                  )}
                </Cell>
              );
            })}
          </Row>
        ))}
      </TableContainer>
    </>
  );
};

export default OutingReservationTable;
