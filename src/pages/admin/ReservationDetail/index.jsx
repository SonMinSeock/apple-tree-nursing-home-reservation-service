import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const Main = styled.main`
  padding: 1rem;
`;

const ReservationContainer = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  border: 1px solid black;
  margin-bottom: 1rem;
`;

const ReservationInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  max-width: 400px;
`;

const Controler = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  & div {
    border: 1px solid black;
    padding: 0.5rem 3rem;
    cursor: pointer;
  }
`;

const ReservationDetail = () => {
  const navigate = useNavigate();
  const {
    state: { date, day, type },
  } = useLocation();

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchGETReservations = async () => {
      try {
        const res = await fetch(
          "https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/reservations/detail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: type === "면회" ? "VISIT" : "OUTING",
              date,
            }),
          }
        );

        const data = await res.json();
        setReservations(data);
      } catch (error) {
        alert("해당 날의 예약 불러오기 실패");
      }
    };

    fetchGETReservations();
  }, []);

  const reservationDelete = async (reservationId) => {
    const res = await fetch(
      `https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/reservations/${reservationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      alert("예약 삭제 실패했습니다.");
    } else {
      alert("예약 삭제 성공했습니다.");
    }
  };
  return (
    <>
      <HeaderContainer>
        <Title>{`${type} 예약 ${date} ${day}`}</Title>
      </HeaderContainer>
      <Main>
        {reservations.map((reservation) => (
          <ReservationContainer key={reservation.reservationId}>
            <ReservationInfoContainer>
              <span>{`${reservation.name} 어르신`}</span>
              <span>{`${reservation.floor}층`}</span>
              <span>{`관계 : ${reservation.guardianRelation}`}</span>
              <span>{`식사 여부 : ${
                reservation.meal === "OUTSIDE" ? "실외 식사" : reservation.meal === "INSIDE" ? "실내 식사" : "기본"
              }`}</span>
            </ReservationInfoContainer>
            <Controler>
              <div
                onClick={() =>
                  navigate("/admin/reservation-update", {
                    state: { reservation, type: type === "면회" ? "VISIT" : "OUTING" },
                  })
                }
              >
                수정
              </div>
              <div onClick={reservationDelete.bind(null, reservation.reservationId)}>삭제</div>
            </Controler>
          </ReservationContainer>
        ))}
      </Main>
    </>
  );
};

export default ReservationDetail;
