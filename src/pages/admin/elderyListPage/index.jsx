import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AdminNav from "../../../components/navbar/AdminNav";

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
  &.controller span {
    cursor: pointer;
  }
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
  padding: 1rem;
`;

const ElderyListPage = () => {
  const navigate = useNavigate();
  const [elderyList, setElderyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGetElderyList = async () => {
      try {
        const res = await fetch("https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/elderly", {
          method: "GET",
          credentials: "include", // 쿠키를 포함하려면
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer token",
          },
          mode: "cors",
        });
        const datas = await res.json();
        console.log(datas);
        setElderyList((prev) => [...prev, ...datas]);
        setLoading(false);
      } catch (error) {
        alert("입소자 명단 읽어오는 도중에 실패했습니다.");
      }
    };

    fetchGetElderyList();
  }, []);

  const elderyDelete = async (elderyId) => {
    const res = await fetch(`https://port-0-apple-tree-v1-1mrfs72llwuqd2yb.sel5.cloudtype.app/elderly/${elderyId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      alert("입소자 명부 삭제 실패했습니다.");
    } else {
      setElderyList((prevElderyList) => prevElderyList.filter((eldery) => eldery.elderlyId !== elderyId));
      alert("입소자 명부 삭제 성공했습니다.");
    }
  };

  return (
    <>
      <AdminNav />
      <Main>
        {!loading &&
          elderyList.map((eldery) => {
            return (
              <TableContainer key={eldery.elderlyId}>
                <Row>
                  <FloorHeader>{`${eldery.floor}층`}</FloorHeader>
                  <WhiteHeader></WhiteHeader>
                </Row>
                <Row>
                  <Cell>{eldery.name}</Cell>
                  <Cell className="controller">
                    <span
                      onClick={() => navigate(`/admin/elderly-list/${eldery.elderlyId}/update`, { state: { eldery } })}
                    >
                      수정
                    </span>
                    <span onClick={elderyDelete.bind(null, eldery.elderlyId)}>삭제</span>
                  </Cell>
                </Row>
                {[...Array(5)].map((_, index) => (
                  <Row key={index}>
                    <Cell></Cell>
                    <Cell></Cell>
                  </Row>
                ))}
              </TableContainer>
            );
          })}
      </Main>
    </>
  );
};

export default ElderyListPage;
