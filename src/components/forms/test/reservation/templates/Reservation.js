/*
import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  display: block;
  margin: 10px 0;
  padding: 5px;
`;

function App() {
  const [attrInputs, setAttrInputs] = useState([
    { id: Math.random(), placeholder: "성함을 입력하세요", type: "text", value: "" },
    { id: Math.random(), placeholder: "층 입력하세요", type: "number", value: "" },
    { id: Math.random(), placeholder: "전화번호를 입력하세요", type: "tel", value: "" },
  ]); // 입력 요소에 대한 속성 객체 상태값.

  // 현재 작성하고 있는 입력창 인덱스 즉
  const [currentInputIndex, setCurrentInputIndex] = useState(0);

  const onChange = (event, id) => {
    const newValue = event.target.value;
    setAttrInputs((prev) => prev.map((input) => (input.id === id ? { ...input, value: newValue } : input)));
  };

  const onBlur = (index) => {
    // 현재 입력창에 포커스가 없어질 때마다 다음 입력창을 표시
    if (index < attrInputs.length - 1 && attrInputs[index].value.trim() !== "") {
      setCurrentInputIndex(index + 1);
    }
  };

  const renderInputs = () => {
    return attrInputs.map((attr, index) => {
      if (index <= currentInputIndex) {
        return (
          <Input
            key={attr.id}
            type={attr.type}
            placeholder={attr.placeholder}
            onChange={(event) => onChange(event, attr.id)}
            onBlur={() => onBlur(index)}
            value={attr.value}
          />
        );
      }
      return null;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(attrInputs);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        {renderInputs()}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default App;
*/

import ReservationForm from "../molecules/ReservationForm";

function Reservation() {
  return (
    <>
      <ReservationForm />
    </>
  );
}

export default Reservation;
