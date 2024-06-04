import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/reservation/atoms/Button/Button.style";
import Container from "../../components/reservation/templates/Container";
import CoinImage from "../../assets/coin.png";

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Span = styled.span`
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

const Text = styled.span`
  display: flex;
  color: #74818e;
  justify-content: center;
  align-items: center;
  padding: 0.6rem;
`;

const Image = styled.img`
  width: 8.8rem;
`;

const ReservationResultPage = () => {
  const {
    state: { reservation },
  } = useLocation();

  const navigate = useNavigate();

  const renderDate = `${reservation.date.split("-")[1]}월 ${reservation.date.slice("-")[2]}일`;
  return (
    <>
      <Container>
        <Flexbox>
          <Image src={CoinImage} />
          <Title>
            {`${reservation.name} 어르신 ${reservation.type === "VISIT" ? "면회" : "외출"} 예약이`}
            <br />
            완료되었습니다
          </Title>
          <Span>{`${renderDate} ${reservation.time.timeFormat} ${reservation.time.clientTime}`}</Span>
        </Flexbox>
        <Text>조회하기를 통해 예약을 확인할 수 있습니다.</Text>
        <Button className="activate" onClick={() => navigate("/")}>
          확인
        </Button>
      </Container>
    </>
  );
};

export default ReservationResultPage;
