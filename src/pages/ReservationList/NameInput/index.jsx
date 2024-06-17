import React, { useEffect, useRef, useState } from "react";
import Container from "../../../components/reservation/templates/Container";
import { BackBar } from "../../../components/reservation/molecules/BackBar/BackBar.style";
import Header from "../../../components/reservation/molecules/Header";
import { FaAngleLeft } from "react-icons/fa6";
import Wrapper from "../../../components/reservation/molecules/Wrapper";
import { Label } from "../../../components/reservation/atoms/Label/Label.style";
import { Input } from "../../../components/reservation/atoms/Input/Input.style";
import Form from "../../../components/reservation/molecules/Form";
import { useNavigate } from "react-router-dom";
import { Title } from "../../../components/reservation/atoms/Title/Title.style";
import { Button } from "../../../components/reservation/atoms/Button/Button.style";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetReservationList } from "../../../store/actions/reservationActions";
import { reservationActions } from "../../../store/slices/reservationSlice";

const NameInputPage = () => {
  const storedReservationList = useSelector((state) => state.reservation.getList); // 리덕스에서 저장된 예약자 내역.

  const [name, setName] = useState(storedReservationList.name || ""); // useState의 초기값을 이전에 입력한 이름으로 설정합니다.
  //const [resrvations, serReservations] = useState([]);
  const dispatch = useDispatch();

  //const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (storedReservationList.list.length > 0) {
      dispatch(reservationActions.resetList());
    }
  }, [dispatch, storedReservationList.list.length]);

  const onChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (name.length === 3) {
      //let reservations = [];
      dispatch(reservationActions.setName(name));
      try {
        await dispatch(fetchGetReservationList(name));
        navigate("/reservation-check/list");
      } catch (error) {
        console.log(error);
        alert("어르신 예약 조회 하는데 실패했습니다. 다시 시도해주세요.");
      }
      /*
      try {
        const response = await fetch(
          `https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/reservations/by-name?name=${name}`,
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
          alert("예약조회 서버 에러");
        }

        const getReservations = await response.json();
        reservations = [...getReservations];
        console.log(reservations);
        navigate("/reservation-check/list", {
          state: { name, reservations },
        });
      } catch (error) {
        //setError("어르신 예약 조회 하는데 실패했습니다. 다시 시도해주세요.");
        console.log(error);
        alert("어르신 예약 조회 하는데 실패했습니다. 다시 시도해주세요.");
      }*/
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
            <Input type="text" placeholder="어르신 성함" maxLength={3} defaultValue={name} onChange={onChange} />{" "}
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
