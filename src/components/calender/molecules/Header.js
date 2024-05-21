import styled from "styled-components";
import Button from "../atoms/Button";
import Title from "../atoms/Title";

const StyleHeader = styled.div`
  display: flex;
  justify-content: center;
`;
function Header({ currentDate, setCurrentDate }) {
  return (
    <StyleHeader>
      <Button position="left" currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <Title currentDate={currentDate} />
      <Button position="right" currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </StyleHeader>
  );
}

export default Header;
