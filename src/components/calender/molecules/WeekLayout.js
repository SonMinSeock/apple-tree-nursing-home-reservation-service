import React from "react";
import styled from "styled-components";

const StyleWeekLayout = styled.div`
  display: flex;
`;
function WeekLayout({ weeks }) {
  return <StyleWeekLayout>{weeks}</StyleWeekLayout>;
}

export default WeekLayout;
