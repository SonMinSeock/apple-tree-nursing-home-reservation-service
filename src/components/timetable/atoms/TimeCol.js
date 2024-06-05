import React from "react";
import styled from "styled-components";

const StyleTimeCol = styled.div`
  background-color: ${(props) => (props.$isSelected ? "#78D6BB" : "transparent")};
  color: ${(props) => (props.$isSelected ? "white" : "black")};
  cursor: ${(props) => (props.$isSelected ? "default" : "pointer")};
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
`;

const TimeCol = ({ timeObj, isSelected, onClick }) => {
  return (
    <StyleTimeCol $isSelected={isSelected} onClick={onClick}>
      {timeObj.clientTime}
    </StyleTimeCol>
  );
};
export default TimeCol;
