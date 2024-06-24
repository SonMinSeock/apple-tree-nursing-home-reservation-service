import React, { useState } from "react";
import styled from "styled-components";
import VisitingReservationTable from "./VisitingReservationTable";
import OutingReservationTable from "./OutingReservationTable";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../components/navbar/AdminNav";

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
      <AdminNav />
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
