import React from "react";
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

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 388px;

  font-family: Arial, sans-serif;
`;

const Row = styled.div`
  display: flex;
`;

const HeaderCell = styled.div`
  background-color: #fff39e;
  padding: 10px;
  border: 1px solid black;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

const Cell = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  &.controller span:first-child {
    margin-right: 1rem;
  }
  height: 50px;
`;

const FloorHeader = styled(HeaderCell)`
  flex: 1;
  font-size: 1.2em;
  text-align: center;
`;

const WhiteHeader = styled(HeaderCell)`
  background-color: transparent;
  border: none;
`;

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ElderyListPage = () => {
  return (
    <>
      <HeaderContainer>
        <Title>사과나무요양원 입소자 명부</Title>
      </HeaderContainer>

      <Main>
        <TableContainer>
          <Row>
            <FloorHeader>1층</FloorHeader>
            <WhiteHeader></WhiteHeader>
          </Row>
          <Row>
            <Cell>이름</Cell>
            <Cell className="controller">
              <span>수정</span>
              <span>삭제</span>
            </Cell>
          </Row>
          {[...Array(5)].map((_, index) => (
            <Row key={index}>
              <Cell></Cell>
              <Cell></Cell>
            </Row>
          ))}
        </TableContainer>
        <TableContainer>
          <Row>
            <FloorHeader>1층</FloorHeader>
            <WhiteHeader></WhiteHeader>
          </Row>
          <Row>
            <Cell>이름</Cell>
            <Cell className="controller">
              <span>수정</span>
              <span>삭제</span>
            </Cell>
          </Row>
          {[...Array(5)].map((_, index) => (
            <Row key={index}>
              <Cell></Cell>
              <Cell></Cell>
            </Row>
          ))}
        </TableContainer>
        <TableContainer>
          <Row>
            <FloorHeader>1층</FloorHeader>
            <WhiteHeader></WhiteHeader>
          </Row>
          <Row>
            <Cell>이름</Cell>
            <Cell className="controller">
              <span>수정</span>
              <span>삭제</span>
            </Cell>
          </Row>
          {[...Array(5)].map((_, index) => (
            <Row key={index}>
              <Cell></Cell>
              <Cell></Cell>
            </Row>
          ))}
        </TableContainer>
        <TableContainer>
          <Row>
            <FloorHeader>1층</FloorHeader>
            <WhiteHeader></WhiteHeader>
          </Row>
          <Row>
            <Cell>이름</Cell>
            <Cell className="controller">
              <span>수정</span>
              <span>삭제</span>
            </Cell>
          </Row>
          {[...Array(5)].map((_, index) => (
            <Row key={index}>
              <Cell></Cell>
              <Cell></Cell>
            </Row>
          ))}
        </TableContainer>
      </Main>
    </>
  );
};

export default ElderyListPage;
