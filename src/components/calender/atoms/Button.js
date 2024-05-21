import { addMonths, subMonths } from "date-fns";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";

const StyleButton = styled.div`
  margin: 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
function Button({ position, currentDate, setCurrentDate }) {
  // date-fns 함수인 subMonths를 사용하여 클릭 시 현재 달에서 1달을 빼줌
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // date-fns 함수인 addMonths를 사용하여 클릭 시 현재 달에서 1달을 더해줌
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // position prop이 "left"이면 왼쪽 화살표 아이콘 버튼 보여준다.
  const render =
    position === "left" ? (
      <StyleButton onClick={prevMonth}>
        <AiOutlineLeft size={24} color="#000" />
      </StyleButton>
    ) : (
      <StyleButton onClick={nextMonth}>
        <AiOutlineRight size={24} color="#000" />
      </StyleButton>
    );

  return render;
}

export default Button;
