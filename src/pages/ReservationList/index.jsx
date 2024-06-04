import React from "react";
import Container from "../../components/reservation/templates/Container";
import { BackBar } from "../../components/reservation/molecules/BackBar/BackBar.style";
import { FaAngleLeft } from "react-icons/fa6";
import Header from "../../components/reservation/molecules/Header";
import { Title } from "../../components/reservation/atoms/Title/Title.style";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { format, parse } from "date-fns";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Span = styled.span`
  display: flex;
  & .highlight {
    color: #ff0202;
    font-weight: 600;
  }
`;

const ReservationBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid #78d6bb;
  padding: 2rem 1rem;
  margin: 0 0.3rem 1.2rem 0.3rem;
  border-radius: 0.9rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & span:first-child {
    font-weight: bold;
    font-size: 1.25rem;
  }
  & .status {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    background-color: #78d6bb;
    color: #ffffff;
    padding: 0.4rem 3rem;
    border-radius: 0.9rem;
  }
  margin-bottom: 1rem;
`;

const DateRow = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 1.5rem;
`;

const NoReservationsTitle = styled.h2`
  text-align: center;
`;

const ReservationListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || "고객님"; // 이전 페이지에서 전달된 이름 불러오기
  const reservations = location.state?.reservations || [];

  console.log(reservations);
  const formatTimeToAmPm = (time) => {
    // 문자열 시간을 Date 객체로 변환
    const date = parse(time, "HH:mm:ss", new Date());

    // 'a'는 오전/오후를 나타내고, 'h:mm:ss a' 형식으로 포맷팅
    const formatedTime = format(date, "h:mm:ss a");

    if (formatedTime.split(" ")[1] === "AM") {
      return `오전 ${formatedTime.split(" ")[0].split(":")[0]}:${formatedTime.split(" ")[0].split(":")[1]}`;
    } else {
      return `오후 ${formatedTime.split(" ")[0].split(":")[0]}:${formatedTime.split(" ")[0].split(":")[1]}`;
    }
  };

  return (
    <Container>
      <BackBar onClick={() => navigate(-1)}>
        <FaAngleLeft />
      </BackBar>
      <Header>
        <Title>{`${name} 어르신 예약 일정`}</Title>
        <Span>
          예약&nbsp;<span className="highlight">변경, 취소</span>는 031-000-0000로 문의해 주세요
        </Span>
      </Header>
      <Section>
        {reservations.length === 0 ? (
          <NoReservationsTitle>예약 내역 없습니다.</NoReservationsTitle>
        ) : (
          reservations.map((reservation) => (
            <ReservationBox key={reservation.reservationId}>
              <Row>
                <span>{reservation.reservationType === "VISIT" ? "면회" : "외출"}</span>
                <span className="status">예약 확정</span>
              </Row>
              <DateRow>
                <span>{`${reservation.reservationDate.split("-")[1]}월 ${
                  reservation.reservationDate.split("-")[2]
                }일`}</span>
                <span>{formatTimeToAmPm(reservation.reservationTime)}</span>
              </DateRow>
            </ReservationBox>
          ))
        )}
      </Section>
    </Container>
  );
};

export default ReservationListPage;
