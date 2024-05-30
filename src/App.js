import styled from "styled-components";
import HomePageImage from "./assets/apple-tree.jpeg";
import LogoImage from "./assets/logo.png";
import { FaChevronRight } from "react-icons/fa";

const Header = styled.header`
  background-color: #78d6bb;
  @media (min-width: 475px) {
    text-align: center;
  }
  padding: 1rem 0;
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

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 21rem;
  height: 8rem;
  border-radius: 1.25rem;
  background-color: #d9d9d9;
  margin: 2.3rem auto;
  font-size: 1.125rem;
  font-weight: bold;
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
  height: 350px;
  border-radius: 1.25rem;
  background-image: url(${HomePageImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
`;

const TextOverlay = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
`;

function App() {
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
        <Box>공지사항</Box>
        <ButtonContainer>
          <Button>
            <span>면회 신청하기</span>
            <span className="icon">
              <FaChevronRight />
            </span>
          </Button>
          <Button>
            <span>외출 신청하기</span>
            <span className="icon">
              <FaChevronRight />
            </span>
          </Button>
          <Button>
            <span>예약 조회하기</span>
            <span className="icon">
              <FaChevronRight />
            </span>
          </Button>
        </ButtonContainer>
      </Main>
    </>
  );
}

export default App;
