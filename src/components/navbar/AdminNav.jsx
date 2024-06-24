import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  font-size: 1.875rem;
  padding: 1rem;
  color: #ffffff;
  background-color: ${(props) => (props.$isCurrentPage ? "#78D666" : "#78d6bb")};
  border: 2px solid #ffffff;
  border-radius: 10px;
  cursor: pointer;
  font-weight: inherit;
  &:hover {
    background-color: ${(props) => (props.$isCurrentPage ? "#78D68E" : "#66c5a8")};
  }
`;

const ADMIN_HOME_PATHNAME = "/admin";
const CREATE_RESERVATION_PATHNAME = "/admin/reservation-create";
const CREATE_ELDERLY_PATHNAME = "/admin/elderly-create";
const ELDERLY_LIST_PATHNAME = "/admin/elderly-list";

const AdminNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <HeaderContainer>
      <Title onClick={() => navigate(ADMIN_HOME_PATHNAME)}>사과나무요양원 간편 예약 시스템 관리자</Title>
      <ButtonContainer>
        <Button
          $isCurrentPage={pathname === CREATE_RESERVATION_PATHNAME}
          onClick={() => navigate(CREATE_RESERVATION_PATHNAME)}
        >
          예약 생성
        </Button>
        <Button $isCurrentPage={pathname === CREATE_ELDERLY_PATHNAME} onClick={() => navigate(CREATE_ELDERLY_PATHNAME)}>
          입소자 작성
        </Button>
        <Button $isCurrentPage={pathname === ELDERLY_LIST_PATHNAME} onClick={() => navigate(ELDERLY_LIST_PATHNAME)}>
          입소자 명부
        </Button>
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default AdminNav;
