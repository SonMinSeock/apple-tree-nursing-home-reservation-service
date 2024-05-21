import React from "react";
import styled from "styled-components";

const StyleDayLayout = styled.div`
  width: 100%;
  margin-top: 10px;
`;
function Daylayout({ day }) {
  return <StyleDayLayout>{day}</StyleDayLayout>;
}

export default Daylayout;
