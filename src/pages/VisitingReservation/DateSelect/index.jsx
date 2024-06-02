// DateSelectPage.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../../components/reservation/templates/Container";
import Header from "../../../components/reservation/molecules/Header";
import { Title } from "../../../components/reservation/atoms/Title/Title.style";
import Calender from "../../../components/calender/templates/Calender";
import Timetable from "../../../components/timetable/templates/Timetable";
import Form from "../../../components/reservation/molecules/Form";
import { Button } from "../../../components/reservation/atoms/Button/Button.style";
import { BackBar } from "../../../components/reservation/molecules/BackBar/BackBar.style";
import { FaAngleLeft } from "react-icons/fa6";

const DateSelectPage = () => {
  const [selectDate, setSelectDate] = useState();
  const [selectTime, setSelectTime] = useState();
  const navigate = useNavigate();

  const {
    state: { reservation },
  } = useLocation();

  const onSubmit = (event) => {
    event.preventDefault();
    const postReservation = {
      ...reservation,
    };

    if (selectDate && selectTime) {
      reservation.date = selectDate;
      reservation.time = selectTime;
      postReservation.date = selectDate;
      postReservation.time = `${selectTime.backendTime}`;

      if (reservation.type === "VISIT") {
        navigate("/visitingReservation/result", {
          state: { reservation },
        });
      } else {
        navigate("/outingReservation/whether-to-eat", {
          state: { reservation, postReservation },
        });
      }
    }
  };

  console.log(selectTime);

  return (
    <Container>
      <BackBar onClick={() => navigate(-1)}>
        <FaAngleLeft />
      </BackBar>
      <Header>
        <Title>날짜와 시간을 선택해 주세요</Title>
      </Header>
      <Form onSubmit={onSubmit}>
        <Calender selectDate={selectDate} setSelectDate={setSelectDate} />
        {selectDate && <Timetable setSelectTime={setSelectTime} type={reservation.type} />}
        <div style={{ height: "100px" }} /> {/* 시간 테이블 아래에 추가된 빈 div */}
        {selectDate && (
          <Button
            type="submit"
            style={{ position: "fixed", bottom: "0", width: "100%" }}
            className={selectDate && selectTime && "activate"}
            disabled={!selectDate || !selectTime}
          >
            다음
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default DateSelectPage;
