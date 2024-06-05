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
  }, [date, type]);

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
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.reservationId !== reservationId)
      );
      alert("예약 삭제 성공했습니다.");
    }
  };

  return (
    <>
      <HeaderContainer>
        <Title>{`${type} 예약 ${date} ${day}`}</Title>
        <ButtonContainer>
          <Button onClick={() => navigate("/admin/reservation-create")}>예약 생성</Button>
          <Button onClick={() => navigate("/admin/elderly-create")}>입소자 작성</Button>
          <Button onClick={() => navigate("/admin/elderly-list")}>입소자 명부</Button>
        </ButtonContainer>
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
              <div onClick={() => reservationDelete(reservation.reservationId)}>삭제</div>
            </Controler>
          </ReservationContainer>
        ))}
      </Main>
    </>
  );
};

export default ReservationDetail;
