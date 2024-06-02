import React, { useRef, useState } from "react";
import { Title } from "../../../components/reservation/atoms/Title/Title.style";
import { Input } from "../../../components/reservation/atoms/Input/Input.style";
import { Button } from "../../../components/reservation/atoms/Button/Button.style";
import Form from "../../../components/reservation/molecules/Form";
import Container from "../../../components/reservation/templates/Container";
import Header from "../../../components/reservation/molecules/Header";
import Wrapper from "../../../components/reservation/molecules/Wrapper";
import { useLocation, useNavigate } from "react-router-dom";
import { Label } from "../../../components/reservation/atoms/Label/Label.style";
import { FaAngleLeft } from "react-icons/fa6";
import { BackBar } from "../../../components/reservation/molecules/BackBar/BackBar.style";

const NameInputPage = ({ type }) => {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const {
    state: { reservation },
  } = useLocation();

  console.log(reservation);

  const onChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (type === "reservation" && name.length === 3) {
      reservation.name = name;

      navigate("/visitingReservation/relationship-input", {
        state: { reservation },
      });
    } else if (type === "check" && name.length === 3) {
      navigate("/reservation-check/list", {
        state: { name },
      });
    }
  };

  return (
    <>
      <Container>
        <BackBar onClick={() => navigate(-1)}>
          <FaAngleLeft />
        </BackBar>
        <Header>
          <Title>어르신 성함을 입력해주세요</Title>
        </Header>
        <Form onSubmit={onSubmit}>
          <Wrapper>
            <Label>이름</Label>
            <Input type="text" placeholder="어르신 성함" maxLength={3} onChange={onChange} />
          </Wrapper>
          <Button className={name.length === 3 && "activate"} disabled={name.length !== 3}>
            다음
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default NameInputPage;
