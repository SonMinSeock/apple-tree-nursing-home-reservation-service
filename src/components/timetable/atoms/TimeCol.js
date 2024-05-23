import React from "react";
import styled from "styled-components";

const StyleTimeCol = styled.div`
  background-color: ${(props) => (props.$isSelected ? "#03a95a" : "transparent")};
  color: ${(props) => (props.$isSelected ? "white" : "black")};
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
`;

const TimeCol = ({ timeObj, index, setTimeTable }) => {
  const onSelectedTime = (selectTimeIndex) => {
    setTimeTable((table) =>
      table.map((time, index) => (index === selectTimeIndex ? { ...time, isSelect: !time.isSelect } : time))
    );
  };

  return (
    <StyleTimeCol key={timeObj.id} onClick={() => onSelectedTime(index)} $isSelected={timeObj.isSelect}>
      {timeObj.time}
    </StyleTimeCol>
  );
};

export default TimeCol;
