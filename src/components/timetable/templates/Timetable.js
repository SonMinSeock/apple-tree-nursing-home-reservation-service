// Timetable.js
import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import TimeRow from "../molecules/TimeRow";

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

function Timetable({ selectedTime, setSelectTime, type }) {
  const [visitTimeTable, setVisitTimeTable] = useState([
    { id: uuidv4(), timeFormat: "오전", clientTime: "10:30", backendTime: "11:00", isSelect: false },
    { id: uuidv4(), timeFormat: "오전", clientTime: "11:00", backendTime: "11:00", isSelect: false },
    { id: uuidv4(), timeFormat: "오후", clientTime: "02:00", backendTime: "14:00", isSelect: false },
    { id: uuidv4(), timeFormat: "오후", clientTime: "03:00", backendTime: "15:00", isSelect: false },
    { id: uuidv4(), timeFormat: "오후", clientTime: "04:00", backendTime: "16:00", isSelect: false },
  ]);
  const [outingTimeTable, setOutingTimeTable] = useState([
    { id: uuidv4(), timeFormat: "오전", clientTime: "10:30", backendTime: "11:00", isSelect: false },
    { id: uuidv4(), timeFormat: "오전", clientTime: "11:00", backendTime: "11:00", isSelect: false },
    { id: uuidv4(), timeFormat: "오후", clientTime: "02:00", backendTime: "14:00", isSelect: false },
    { id: uuidv4(), timeFormat: "오후", clientTime: "02:30", backendTime: "14:30", isSelect: false },
    { id: uuidv4(), timeFormat: "오후", clientTime: "03:00", backendTime: "15:00", isSelect: false },
    { id: uuidv4(), timeFormat: "오후", clientTime: "03:30", backendTime: "15:30", isSelect: false },
    { id: uuidv4(), timeFormat: "오후", clientTime: "04:00", backendTime: "16:00", isSelect: false },
  ]);

  const handleTimeClick = (clickedId) => {
    const tableToSet = type === "VISIT" ? setVisitTimeTable : setOutingTimeTable;
    const tableToCheck = type === "VISIT" ? visitTimeTable : outingTimeTable;

    tableToSet((prevTable) =>
      prevTable.map((timeObj) =>
        timeObj.id === clickedId ? { ...timeObj, isSelect: !timeObj.isSelect } : { ...timeObj, isSelect: false }
      )
    );

    const selectedTimeObj = tableToCheck.find((timeObj) => timeObj.id === clickedId);
    if (!selectedTime || selectedTime.id !== clickedId) {
      setSelectTime(selectedTimeObj);
    } else {
      setSelectTime(null);
    }
  };

  return (
    <Container>
      {type === "VISIT" ? (
        <TimeRow timeTable={visitTimeTable} onTimeClick={handleTimeClick} />
      ) : (
        <TimeRow timeTable={outingTimeTable} onTimeClick={handleTimeClick} />
      )}
    </Container>
  );
}

export default Timetable;
