import React from "react";
import { subMonths, isSameMonth, startOfMonth } from "date-fns";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";

const StyleButton = styled.div`
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function Button({ position, currentDate, setCurrentDate }) {
  // 이전 달로 이동하는 함수
  const prevMonth = () => {
    // 현재 달의 시작일을 가져옵니다.
    const startOfCurrentMonth = startOfMonth(currentDate);
    // 현재 달이 오늘의 달과 같으면서 이전 달로 이동 가능한지 확인합니다.
    if (!isSameMonth(startOfCurrentMonth, new Date())) {
      // 이전 달로 이동합니다.
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  // 다음 달로 이동하는 함수
  const nextMonth = () => {
    // 다음 달로 이동합니다.
    setCurrentDate(subMonths(currentDate, -1));
  };

  // 이전 달로 이동 가능한지 여부를 확인하여 아이콘을 렌더링합니다.
  const renderButton = () => {
    if (position === "left" && !isSameMonth(startOfMonth(currentDate), new Date())) {
      return (
        <StyleButton onClick={prevMonth}>
          <AiOutlineLeft size={24} color="#000" />
        </StyleButton>
      );
    } else if (position === "right") {
      return (
        <StyleButton onClick={nextMonth}>
          <AiOutlineRight size={24} color="#000" />
        </StyleButton>
      );
    }
  };

  return renderButton();
}

export default Button;
