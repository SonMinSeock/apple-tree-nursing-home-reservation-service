import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const reservation = location.state ? location.state.reservation : {};

  const onChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (type === "reservation" && name.length <= 4) {
      reservation.name = name;
      setLoading(true);

      try {
        const response = await fetch(
          `https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/elderly/findByName?name=${reservation.name}`,
          {
            method: "GET",
            credentials: "include", // 쿠키를 포함하려면
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer token",
            },
            mode: "cors",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch elderly ID");
        }

        const elderlyId = await response.json();
        console.log("어르신 id 값 : ", elderlyId);

        reservation.elderlyId = elderlyId;

        navigate("/visitingReservation/relationship-input", {
          state: { reservation },
        });
      } catch (error) {
        setError("어르신 정보를 불러오는데 실패했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    } else if (type === "check" && name.length <= 4) {
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
            <Input type="text" placeholder="어르신 성함" maxLength="3" onChange={onChange} value={name} required />
          </Wrapper>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Button
            className={name.length >= 3 && name.length <= 4 ? "activate" : ""}
            disabled={name.length < 3 || name.length > 4 || loading}
          >
            {loading ? "로딩 중..." : "다음"}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default NameInputPage;
