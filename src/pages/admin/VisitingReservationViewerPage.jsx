import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7열 */
  grid-template-rows: repeat(7, 1fr); /* 7행 */
  gap: 10px; /* 그리드 아이템 간의 간격 설정 */
  width: 100%;
  height: 100%;
`;

const GridItem = styled.div`
  background-color: #ccc; /* 그리드 아이템의 배경색 */
  border: 1px solid #000; /* 그리드 아이템의 테두리 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VisitingReservationViewerPage = () => {
  return (
    <GridContainer>
      {[...Array(49)].map((_, index) => (
        <GridItem key={index}>{index + 1}</GridItem>
      ))}
    </GridContainer>
  );
};

export default VisitingReservationViewerPage;
