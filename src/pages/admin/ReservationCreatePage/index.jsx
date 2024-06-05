import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  & button {
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
  }
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

const Input = styled.input`
  padding: 0.7rem;
  font-family: inherit;
  font-size: 1.25rem;
  font-weight: bold;
  border: 2px solid #78d6bb;
  border-radius: 0.625rem;
  &::placeholder {
    font-weight: normal;
  }
`;

const Label = styled.label`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
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

const ReservationCreatePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [meal, setMeal] = useState("INSIDE");
  const [reservationType, setReservationType] = useState("VISIT");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRelationChange = (event) => {
    setRelationship(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleReservationTypeChange = (event) => {
    setReservationType(event.target.value);
  };

  const handleMealChange = (event) => {
    setMeal(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name.length < 3 || name.length === 0) {
      alert("이름 3글자 이내 작성해야 합니다.");
      return;
    }

    const createdReservation = {
      elderlyName: name,
      guardianRelation: relationship,
      reservationType: reservationType,
      reservationDate: date,
      reservationTime: time,
    };

    if (reservationType === "OUTING") {
      createdReservation.meal = meal;
    }

    const res = await fetch(`https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/reservations/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdReservation),
    });

    if (res.ok) {
      alert("예약 생성 성공했습니다.");
      navigate("/admin");
    } else {
      alert("예약 생성 실패 했습니다.");
    }
  };

  return (
    <>
      <HeaderContainer>
        <Title>예약 생성</Title>
        <ButtonContainer>
          <Button onClick={() => navigate("/admin/reservation-create")}>예약 생성</Button>
          <Button onClick={() => navigate("/admin/elderly-create")}>입소자 작성</Button>
          <Button onClick={() => navigate("/admin/elderly-list")}>입소자 명부</Button>
        </ButtonContainer>
      </HeaderContainer>
      <FormContainer onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="eldery-name">이름</Label>
          <Input
            type="text"
            id="eldery-name"
            value={name}
            onChange={handleNameChange}
            placeholder="어르신 성함"
            maxLength={3}
          />
        </div>
        <div>
          <Label htmlFor="guardian-relation">관계</Label>
          <Input
            type="text"
            id="guardian-relation"
            value={relationship}
            onChange={handleRelationChange}
            placeholder="딸, 아들"
          />
        </div>
        <div>
          <Label htmlFor="date-input">날짜</Label>
          <Input type="date" id="date-input" value={date} onChange={handleDateChange} />
        </div>
        <div>
          <Label htmlFor="time-input">시간</Label>
          <Input type="time" id="time-input" value={time} onChange={handleTimeChange} />
        </div>
        <div>
          <Label htmlFor="reservation-type-select">예약 유형</Label>
          <Select id="reservation-type-select" value={reservationType} onChange={handleReservationTypeChange}>
            <option value="VISIT">면회</option>
            <option value="OUTING">외출</option>
          </Select>
        </div>
        {reservationType === "OUTING" && (
          <div>
            <Label htmlFor="meal-select">식사 여부</Label>
            <Select id="meal-select" value={meal} onChange={handleMealChange}>
              <option value="INSIDE">실내 식사</option>
              <option value="OUTSIDE">실외 식사</option>
            </Select>
          </div>
        )}
        <Button type="submit">생성 하기</Button>
      </FormContainer>
    </>
  );
};

export default ReservationCreatePage;
