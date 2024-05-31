// TimeCol.js
import React from "react";
import styled from "styled-components";

const StyleTimeCol = styled.div`
  background-color: ${(props) => (props.$isSelected ? "#78D6BB" : "transparent")};
  color: ${(props) => (props.$isSelected ? "white" : "black")};
  cursor: ${(props) => (props.$isSelected ? "default" : "pointer")};
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
`;

const TimeCol = ({ timeObj, onClick }) => {
  return (
    <StyleTimeCol $isSelected={timeObj.isSelect} onClick={onClick}>
      {timeObj.clientTime}
    </StyleTimeCol>
  );
};

export default TimeCol;
