import React from "react";
import styled from "styled-components";
import TimeCol from "../atoms/TimeCol";

const StyleTimeRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 800px; /* 최대 너비 설정 */
`;

const TimeRow = ({ timeTable, setTimeTable }) => {
  return (
    <StyleTimeRow>
      {timeTable.map((timeObj, index) => (
        <TimeCol key={timeObj.id} timeObj={timeObj} index={index} setTimeTable={setTimeTable} />
      ))}
    </StyleTimeRow>
  );
};

export default TimeRow;
