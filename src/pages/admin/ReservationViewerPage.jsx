import React, { useState } from "react";
import styled from "styled-components";
import VisitingReservationTable from "./VisitingReservationTable";
import OutingReservationTable from "./OutingReservationTable";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #78d6bb;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  font-size: 1.875rem;
  padding: 1rem;
  color: #ffffff;
  background-color: #78d6bb;
  border: 2px solid #ffffff;
  border-radius: 10px;
  cursor: pointer;
  font-weight: inherit;
  &:hover {
    background-color: #66c5a8;
  }
`;

const ReservationControler = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
`;

const ReservationView = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  border: 2px solid #78d6bb;
  border-radius: 20px;
  padding: 1rem;
  cursor: pointer;
  color: #78d6bb;
  &.view {
    background-color: #78d6bb;
    color: #ffffff;
  }
`;

const ReservationViewerPage = () => {
  const [reservationView, setReservationView] = useState("면회 예약"); // 현재 보고있는 예약 상태 처음에 면회 예약 내역들 보여준다.

  const navigate = useNavigate();

  const viewBtnChange = (view) => {
    setReservationView(view);
  };

  return (
    <>
      <HeaderContainer>
        <Title>사과나무요양원 간편 예약 시스템 관리자</Title>
        <ButtonContainer>
          <Button onClick={() => navigate("/admin/reservation-create")}>예약 생성</Button>
          <Button onClick={() => navigate("/admin/elderly-create")}>입소자 작성</Button>
          <Button onClick={() => navigate("/admin/elderly-list")}>입소자 명부</Button>
        </ButtonContainer>
      </HeaderContainer>
      <ReservationControler>
        <ReservationView
          className={reservationView === "면회 예약" ? "view" : ""}
          onClick={viewBtnChange.bind(null, "면회 예약")}
        >
          면회 예약
        </ReservationView>
        <ReservationView
          className={reservationView === "외출 예약" ? "view" : ""}
          onClick={viewBtnChange.bind(null, "외출 예약")}
        >
          외출 예약
        </ReservationView>
      </ReservationControler>
      {reservationView === "면회 예약" && <VisitingReservationTable />}
      {reservationView === "외출 예약" && <OutingReservationTable />}
    </>
  );
};

export default ReservationViewerPage;
