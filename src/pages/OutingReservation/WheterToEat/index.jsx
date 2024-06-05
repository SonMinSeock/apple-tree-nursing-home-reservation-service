import React, { useState } from "react";
import Container from "../../../components/reservation/templates/Container";
import { BackBar } from "../../../components/reservation/molecules/BackBar/BackBar.style";
import Form from "../../../components/reservation/molecules/Form";
import styled from "styled-components";
import { FaAngleLeft } from "react-icons/fa6";
import Header from "../../../components/reservation/molecules/Header";
import { Title } from "../../../components/reservation/atoms/Title/Title.style";
import { Button } from "../../../components/reservation/atoms/Button/Button.style";
import { useLocation, useNavigate } from "react-router-dom";

const SelectBox = styled.div`
  border: ${(props) => (props.$isSelect ? "none" : "2px solid #78d6bb")};
  color: ${(props) => (props.$isSelect ? "#FFFFFF" : "#78d6bb")};
  background-color: ${(props) => (props.$isSelect ? "#78d6bb" : "#FFFFFF")};
  font-weight: bold;
  font-size: 1.35rem;
  text-align: center;
  padding: 1.35rem 1.6rem;
  border-radius: 1.25rem;
  width: 100%;
  cursor: pointer;
`;

const Flexbox = styled.div`
  display: flex;
  margin: 0 1rem;
  gap: 1rem;
`;
const WheterToEatPage = () => {
  const [selectWheterToEat, setSelectWheterToEat] = useState("");
  const {
    state: { reservation, postReservation },
  } = useLocation();
  const navigate = useNavigate();

  console.log(postReservation);
  const onSubmit = async (event) => {
    event.preventDefault();
    const enteredWheterToEat = selectWheterToEat;

    if (enteredWheterToEat) {
      reservation.wheterToEat = enteredWheterToEat;
      postReservation.wheterToEat = enteredWheterToEat;

      await fetch("https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservationType: reservation.type,
          elderlyId: reservation.elderlyId,
          reservationDate: postReservation.date,
          reservationTime: postReservation.time,
          guardianRelation: reservation.relationship,
          meal: reservation.wheterToEat === "원외 식사" ? "OUTSIDE" : "INSIDE",
        }),
      });

      navigate("/outingReservation/result", {
        state: { reservation },
      });
    }
  };

  return (
    <Container>
      <BackBar onClick={() => navigate(-1)}>
        <FaAngleLeft />
      </BackBar>
      <Header>
        <Title>식사 여부를 알려주세요</Title>
      </Header>
      <Form onSubmit={onSubmit}>
        <Flexbox>
          <SelectBox onClick={() => setSelectWheterToEat("원내 식사")} $isSelect={selectWheterToEat === "원내 식사"}>
            원내 식사
          </SelectBox>
          <SelectBox onClick={() => setSelectWheterToEat("원외 식사")} $isSelect={selectWheterToEat === "원외 식사"}>
            원외 식사
          </SelectBox>
        </Flexbox>
        <Button className={selectWheterToEat && "activate"} disabled={!selectWheterToEat}>
          다음
        </Button>
      </Form>
    </Container>
  );
};

export default WheterToEatPage;
