import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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

const ElderyUpdatePage = () => {
  const { elderyId } = useParams();
  const {
    state: { eldery },
  } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(eldery.name);
  const [floor, setFloor] = useState(eldery.floor);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFloorChange = (event) => {
    setFloor(+event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Form submission logic here

    const updatedEldery = {
      name,
      floor,
    };

    const res = await fetch(`https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/elderly/${elderyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEldery),
    });

    if (res.ok) {
      navigate("/admin");
    } else {
      alert("입소자 수정 실패했습니다.");
    }
  };

  return (
    <>
      <HeaderContainer>
        <Title>000 어르신 명부 수정</Title>
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
          <Label htmlFor="floor">거주 층</Label>
          <Input type="number" id="floor" value={floor} onChange={handleFloorChange} min={1} max={4} />
        </div>

        <Button type="submit">수정 하기</Button>
      </FormContainer>
    </>
  );
};

export default ElderyUpdatePage;
