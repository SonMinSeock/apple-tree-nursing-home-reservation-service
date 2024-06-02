import React, { useRef, useState } from "react";
import Container from "../../../components/reservation/templates/Container";
import { BackBar } from "../../../components/reservation/molecules/BackBar/BackBar.style";
import Header from "../../../components/reservation/molecules/Header";
import { FaAngleLeft } from "react-icons/fa6";
import Wrapper from "../../../components/reservation/molecules/Wrapper";
import { Label } from "../../../components/reservation/atoms/Label/Label.style";
import { Input } from "../../../components/reservation/atoms/Input/Input.style";
import Form from "../../../components/reservation/molecules/Form";
import { useNavigate, useLocation } from "react-router-dom";
import { Title } from "../../../components/reservation/atoms/Title/Title.style";
import { Button } from "../../../components/reservation/atoms/Button/Button.style";

const NameInputPage = () => {
  const location = useLocation(); // useLocation 훅을 사용하여 이전 페이지의 state를 받아옵니다.
  const [name, setName] = useState(location.state?.name || ""); // useState의 초기값을 이전에 입력한 이름으로 설정합니다.
  const navigate = useNavigate();

  const onChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (name.length === 3) {
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
            <Input
              type="text"
              placeholder="성함을 입력해주세요. ex) 홍길동"
              maxLength={3}
              defaultValue={name}
              onChange={onChange}
            />{" "}
            {/* 입력창의 기본값을 useState에서 받아온 이름으로 설정합니다. */}
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
