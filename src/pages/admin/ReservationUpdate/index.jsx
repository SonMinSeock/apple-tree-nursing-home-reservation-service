import React, { useState } from "react";
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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  max-width: 450px;
  margin: auto;
  & div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const Label = styled.label`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 1rem 1.8rem;
  font-size: 1.3rem;
  background-color: #78d6bb;
  color: #ffffff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background-color: #66c5a8;
  }
`;

const ReservationUpdatePage = () => {
  const {
    state: { reservation, type },
  } = useLocation();
  const navigate = useNavigate();
  const [date, setDate] = useState(reservation.reservationDate);
  const [time, setTime] = useState(reservation.reservationTime);
  const [meal, setMeal] = useState(reservation.meal);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleMealChange = (event) => {
    setMeal(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Form submission logic here
    const updatedReservation = {
      elderlyId: reservation.elderlyId,
      guardianRelation: reservation.guardianRelation,
      reservationType: type,
      reservationDate: date,
      reservationTime: time,
    };

    if (type === "OUTING") {
      updatedReservation.meal = meal;
    }

    const res = await fetch(
      `https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/reservations/${reservation.reservationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReservation),
      }
    );

    if (res.ok) {
      navigate("/admin");
    } else {
      alert("예약 수정 실패했습니다.");
    }
  };

  return (
    <>
      <HeaderContainer>
        <Title>{`${reservation.name} 어르신 예약 수정`}</Title>
      </HeaderContainer>
      <FormContainer onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="date-input">날짜</Label>
          <Input type="date" id="date-input" value={date} onChange={handleDateChange} />
        </div>
        <div>
          <Label htmlFor="time-input">시간</Label>
          <Input type="time" id="time-input" value={time} onChange={handleTimeChange} />
        </div>
        <div>
          <Label htmlFor="meal-select">식사 여부</Label>
          <Select id="meal-select" value={meal} onChange={handleMealChange}>
            <option value="DEFAULT">기본</option>
            <option value="INSIDE">실내 식사</option>
            <option value="OUTSIDE">실외 식사</option>
          </Select>
        </div>
        <Button type="submit">수정 하기</Button>
      </FormContainer>
    </>
  );
};

export default ReservationUpdatePage;
