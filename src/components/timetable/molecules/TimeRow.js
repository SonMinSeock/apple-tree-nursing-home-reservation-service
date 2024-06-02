import React from "react";
import styled from "styled-components";
import TimeCol from "../atoms/TimeCol";

const Container = styled.div`
  width: 100%;
`;
const StyleTimeRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 800px;
  &:first-child {
    margin-bottom: 1rem;
  }
`;

const Span = styled.span`
  grid-column: 1 / -1; /* Span이 전체 열을 차지하도록 설정 */
  font-weight: bold; /* 굵은 글꼴 */
`;

const TimeRow = ({ timeTable, onTimeClick }) => {
  const handleTimeClick = (id) => {
    onTimeClick(id);
  };

  const morningTimes = timeTable.filter((timeObj) => timeObj.timeFormat === "오전");
  const afternoonTimes = timeTable.filter((timeObj) => timeObj.timeFormat === "오후");

  return (
    <Container>
      <StyleTimeRow>
        <Span>오전</Span>
        {morningTimes.map((timeObj) => (
          <TimeCol
            key={timeObj.id}
            timeObj={timeObj}
            isSelected={timeObj.isSelect}
            onClick={() => handleTimeClick(timeObj.id)}
          />
        ))}
      </StyleTimeRow>
      <StyleTimeRow>
        <Span>오후</Span>
        {afternoonTimes.map((timeObj) => (
          <TimeCol
            key={timeObj.id}
            timeObj={timeObj}
            isSelected={timeObj.isSelect}
            onClick={() => handleTimeClick(timeObj.id)}
          />
        ))}
      </StyleTimeRow>
    </Container>
  );
};
export default TimeRow;
