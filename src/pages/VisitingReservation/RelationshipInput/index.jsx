import React, { useRef } from "react";
import Container from "../../../components/reservation/templates/Container";
import Header from "../../../components/reservation/molecules/Header";
import { Title } from "../../../components/reservation/atoms/Title/Title.style";
import Form from "../../../components/reservation/molecules/Form";
import { Input } from "../../../components/reservation/atoms/Input/Input.style";
import Wrapper from "../../../components/reservation/molecules/Wrapper";
import { Button } from "../../../components/reservation/atoms/Button/Button.style";
import { useLocation, useNavigate } from "react-router-dom";
import { BackBar } from "../../../components/reservation/molecules/BackBar/BackBar.style";
import { FaAngleLeft } from "react-icons/fa6";
import { Label } from "../../../components/reservation/atoms/Label/Label.style";

const RelationshipInputPage = () => {
  const relationshipInputRef = useRef();
  const navigate = useNavigate();

  const {
    state: { reservation },
  } = useLocation();
  console.log(reservation);

  const onSubmit = (event) => {
    event.preventDefault();
    const enteredRelationship = relationshipInputRef.current.value;

    if (enteredRelationship) {
      reservation.relationship = enteredRelationship;
      navigate("/visitingReservation/date-select", {
        state: { reservation },
      });
    }
  };

  return (
    <>
      <Container>
        <BackBar>
          <FaAngleLeft onClick={() => navigate(-1)} />
        </BackBar>
        <Header>
          <Title>어르신과의 관계를 작성해 주세요</Title>
        </Header>
        <Form onSubmit={onSubmit}>
          <Wrapper>
            <Label>관계</Label>
            <Input type="text" ref={relationshipInputRef} placeholder="딸, 아들" />
          </Wrapper>
          <Button>다음</Button>
        </Form>
      </Container>
    </>
  );
};

export default RelationshipInputPage;
