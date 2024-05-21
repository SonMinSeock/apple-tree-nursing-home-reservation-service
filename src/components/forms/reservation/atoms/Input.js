import React from "react";
import styled from "styled-components";

const StyleInput = styled.input`
  display: block;
  margin: 10px 0;
  padding: 5px;
`;

const Input = ({ attrInputs, currentInputIndex, onChange }) => {
  const renderInputs = () => {
    return attrInputs
      .map((attr, index) => {
        if (index <= currentInputIndex) {
          return (
            <StyleInput
              key={attr.id}
              type={attr.type}
              maxLength={attr.type === "tel" ? attr.maxLength : ""}
              placeholder={attr.placeholder}
              onChange={(event) => onChange(event, attr.id, index)}
              value={attr.value}
            />
          );
        }
        return null;
      })
      .reverse();
  };
  return <>{renderInputs()}</>;
};

export default Input;
