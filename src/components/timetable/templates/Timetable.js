// Timetable.js
import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import TimeRow from "../molecules/TimeRow";

const Container = styled.div`
  display: flex;

  padding: 20px;
`;

function Timetable({ selectedTime, setSelectTime }) {
  const [timeTable, setTimeTable] = useState([
    { id: uuidv4(), timeFormat: "오전", clientTime: "10:30", backendTime: "11:00", isSelect: false },
    { id: uuidv4(), timeFormat: "오전", clientTime: "11:00", backendTime: "11:00", isSelect: false },
    { id: uuidv4(), timeFormat: "오후", clientTime: "02:00", backendTime: "14:00", isSelect: false },
    { id: uuidv4(), timeFormat: "오후", clientTime: "03:00", backendTime: "15:00", isSelect: false },
    { id: uuidv4(), timeFormat: "오후", clientTime: "04:00", backendTime: "16:00", isSelect: false },
  ]);

  const handleTimeClick = (clickedId) => {
    setTimeTable((prevTable) =>
      prevTable.map(
        (timeObj) =>
          timeObj.id === clickedId ? { ...timeObj, isSelect: !timeObj.isSelect } : { ...timeObj, isSelect: false } // 클릭된 시간 외에는 선택 해제
      )
    );

    const selectedTimeObj = timeTable.find((timeObj) => timeObj.id === clickedId);
    if (!selectedTime || selectedTime.id !== clickedId) {
      setSelectTime(selectedTimeObj);
    } else {
      setSelectTime(null);
    }
  };

  return (
    <Container>
      <TimeRow timeTable={timeTable} onTimeClick={handleTimeClick} />
    </Container>
  );
}

export default Timetable;
