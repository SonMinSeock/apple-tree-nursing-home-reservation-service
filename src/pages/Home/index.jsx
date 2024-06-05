import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";
import HomePageImage from "../../assets/apple-tree.jpeg";
import LogoImage from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = styled.header`
  background-color: #78d6bb;
  @media (min-width: 475px) {
    text-align: center;
  }
  padding: 1rem 0;
  padding-top: 1.2rem;
`;

const Logo = styled.img`
  max-width: 100%;
  height: auto;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  max-width: 19.375rem;
  font-size: 1.25rem;
  font-weight: bold;
  height: 4.125rem;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #e9e9ec;
  border-radius: 1.25rem;
  padding-right: 1.2rem;
  cursor: pointer;
  & span:first-child {
    flex: 1;
    text-align: center;
  }
  & span.icon {
    display: flex;
    margin-left: auto;
    font-size: 1.7rem;
  }
  &.visit-outing {
    background-color: #78d6bb;
    color: #ffffff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const Main = styled.main`
  margin: auto;
  width: 100%;
  max-width: 768px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.3rem;
`;
const ImageBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 384px;
  min-height: 300px;
  border-radius: 1.25rem;
  background-image: url(${HomePageImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const TextOverlay = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
`;

const Footer = styled.footer`
  background-color: #bfecdf;
  padding: 1.5rem 1rem;
  @media (min-width: 596px) {
    display: flex;
    justify-content: center;
  }
  & p {
    color: #51575e;
    font-weight: bold;
    font-size: 1.375rem;
    line-height: 36px;
    margin-bottom: 0.3rem;
  }
  & span {
    color: #808080;
  }
  & div:first-child {
    margin-bottom: 2rem;
    & span {
      font-size: 1.125rem;
    }
  }
  & div:last-child {
    display: flex;
    flex-direction: column;
    & span:first-child {
      font-size: 0.93rem;
    }
    & span:last-child {
      font-size: 1.375rem;
      font-weight: bold;
      color: #51575e;
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  // 예약죄회에 대한 이름 입력값 상태.
  const [reservationChekName, setReservationChekName] = useState("");

  // 리다이렉트 핸들러
  const redirectHandler = (path, type) => {
    if ((path && type === "OUTING") || type === "VISIT") {
      navigate(path, { state: { reservation: { type } } });
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <Header>
        <Logo src={LogoImage} alt="로고 이미지" />
      </Header>
      <Main>
        <ImageContainer>
          <ImageBox>
            <TextOverlay>
              사과나무 요양원은
              <br />
              안전하고 쾌적한 환경을 제공해드립니다.
            </TextOverlay>
          </ImageBox>
        </ImageContainer>
        <ButtonContainer>
          <Button
            onClick={redirectHandler.bind(null, "/visitingReservation/name-input", "VISIT")}
            className="visit-outing"
          >
            <span>면회 신청하기</span>
            <span className="icon">
              <FaChevronRight />
            </span>
          </Button>
          <Button
            onClick={redirectHandler.bind(null, "/outingReservation/name-input", "OUTING")}
            className="visit-outing"
          >
            <span>외출 신청하기</span>
            <span className="icon">
              <FaChevronRight />
            </span>
          </Button>
          <Button onClick={redirectHandler.bind(null, "/reservation-check/name-input")}>
            <span>예약 조회하기</span>
            <span className="icon">
              <FaChevronRight />
            </span>
          </Button>
        </ButtonContainer>
      </Main>
      <Footer>
        <div>
          <div>
            <p>
              예약 취소, 변경이 필요한 경우
              <br /> 언제든 연락주세요.
            </p>
            <span>오전 9:00 ~ 오후 6:00</span>
          </div>
          <div>
            <span>예약 관련</span>
            <span>031-000-0000</span>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default Home;
