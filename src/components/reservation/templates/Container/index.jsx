import styled from "styled-components";

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 540px;
  margin: auto;
`;

const Container = ({ children }) => {
  return <StyleContainer>{children}</StyleContainer>;
};

export default Container;
