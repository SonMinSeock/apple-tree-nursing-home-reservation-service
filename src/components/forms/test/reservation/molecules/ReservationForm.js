import React, { useRef, useState } from "react";
import Input from "../atoms/Input";

function ReservationForm() {
  const [attrInputs, setAttrInputs] = useState([
    { id: Math.random(), placeholder: "성함을 입력하세요", type: "text", value: "" },
    { id: Math.random(), placeholder: "층 입력하세요", type: "number", value: "" },
    { id: Math.random(), placeholder: "전화번호를 입력하세요", type: "tel", value: "", maxLength: 11 },
  ]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const timerRef = useRef(null); // 타이머 id 초기값 null로 설정.

  // 입력 값 상태 변경 할때마다 폼 제출 가능한지 체크해준다.
  const isSubmitDisabled = attrInputs.some(
    (input) => input.value.trim() === "" || (input.type === "tel" && input.value.length < 11) // 소괼호 연산먼저 실행한다.
  );

  const onChange = (event, id, targetIndex) => {
    const newValue = event.target.value;
    setAttrInputs((prev) => prev.map((input) => (input.id === id ? { ...input, value: newValue } : input)));

    // 이전 타이머가 있으면 제거
    clearTimeout(timerRef.current);

    // 현재 입력 창이 마지막 입력 창이 아니고 값이 변경되었을 때만 타이머 시작
    if (targetIndex < attrInputs.length - 1 && newValue.trim() !== "") {
      timerRef.current = setTimeout(() => {
        setCurrentInputIndex(targetIndex + 1);
      }, 1700);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(attrInputs);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input attrInputs={attrInputs} currentInputIndex={currentInputIndex} onChange={onChange} />
        <button type="submit" disabled={isSubmitDisabled}>
          Submit
        </button>
      </form>
    </>
  );
}

export default ReservationForm;
