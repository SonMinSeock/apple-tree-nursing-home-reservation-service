import React from "react";
import Container from "../../components/reservation/templates/Container";
import { BackBar } from "../../components/reservation/molecules/BackBar/BackBar.style";
import { FaAngleLeft } from "react-icons/fa6";
import Header from "../../components/reservation/molecules/Header";
import { Title } from "../../components/reservation/atoms/Title/Title.style";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

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

const ReservationListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || "고객님"; // 이전 페이지에서 전달된 이름 불러오기

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
        <ReservationBox>
          <Row>
            <span>면회</span>
            <span className="status">예약 확정</span>
          </Row>
          <DateRow>
            <span>06월 01일</span>
            <span>오전 11:00</span>
          </DateRow>
        </ReservationBox>
        <ReservationBox>
          <Row>
            <span>면회</span>
            <span className="status">예약 확정</span>
          </Row>
          <DateRow>
            <span>06월 01일</span>
            <span>오전 11:00</span>
          </DateRow>
        </ReservationBox>
        <ReservationBox>
          <Row>
            <span>면회</span>
            <span className="status">예약 확정</span>
          </Row>
          <DateRow>
            <span>06월 01일</span>
            <span>오전 11:00</span>
          </DateRow>
        </ReservationBox>
      </Section>
    </Container>
  );
};

export default ReservationListPage;
