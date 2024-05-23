import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import TimeRow from "../molecules/TimeRow";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

function Timetable() {
  const [timeTable, setTimeTable] = useState([
    { id: uuidv4(), time: "09:30", isSelect: false },
    { id: uuidv4(), time: "10:00", isSelect: false },
    { id: uuidv4(), time: "10:30", isSelect: false },
    { id: uuidv4(), time: "11:00", isSelect: false },
    { id: uuidv4(), time: "11:30", isSelect: false },
    { id: uuidv4(), time: "12:00", isSelect: false },
    { id: uuidv4(), time: "12:30", isSelect: false },
    { id: uuidv4(), time: "13:00", isSelect: false },
    { id: uuidv4(), time: "13:30", isSelect: false },
    { id: uuidv4(), time: "14:00", isSelect: false },
    { id: uuidv4(), time: "14:30", isSelect: false },
    { id: uuidv4(), time: "15:00", isSelect: false },
    { id: uuidv4(), time: "15:30", isSelect: false },
    { id: uuidv4(), time: "16:00", isSelect: false },
    { id: uuidv4(), time: "16:30", isSelect: false },
    { id: uuidv4(), time: "17:00", isSelect: false },
  ]);

  const renderTimeTable = () => {
    return <TimeRow timeTable={timeTable} setTimeTable={setTimeTable} />;
  };

  return <Container>{renderTimeTable()}</Container>;
}

export default Timetable;
