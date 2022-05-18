import React from 'react';
import styled from 'styled-components';

function Login() {
  return (
    <All>
      <LoginWrapper>
        <LoginContainer>
          <ContainerImg>
            <span>🍿</span>
          </ContainerImg>
          <ContainerTitle>Welcome!</ContainerTitle>
          <ContainerDesc>
            <h4 className="Description">영화 그 이상, TERRA BOX</h4>
          </ContainerDesc>
          <ContainerBtn>
            <a
              href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=http://localhost:3000/oauth/callback/kakao&response_type=code`}
            >
              <img alt="kakaoBtn" src="/images/kakaoLoginBtn.png" />
            </a>
          </ContainerBtn>
          <ContainerLinks>
            <ContainerSpan>
              <i class="fa-brands fa-facebook" /> 페이스북
            </ContainerSpan>
            <ContainerSpan>
              <i class="fa-brands fa-neos" /> 네이버
            </ContainerSpan>
            <ContainerSpan>
              <i class="fa-solid fa-envelope" /> 이메일
            </ContainerSpan>
          </ContainerLinks>
          <ContainerSignup>
            <span>
              아직 회원이 아니신가요? <a>회원가입</a>
            </span>
          </ContainerSignup>
        </LoginContainer>
      </LoginWrapper>
    </All>
  );
}

export default Login;

const All = styled.div`
  background: #e0e0e0;
  height: 100vh;
  background: rgb(20, 71, 51);
`;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px 50px;
  margin: auto;
  width: 700px;
  height: 100%;
  background: rgb(20, 71, 51);
`;

const LoginContainer = styled.div`
  margin: auto;
  padding: 80px 0px;
  display: flex;
  flex-direction: column;
  align-item: center;
  width: 80%;
  height: 80%;
  border: 1px solid #e9ecef;
  border-radius: 10%;
  text-align: center;
  background: white;
`;

const ContainerTitle = styled.h3`
  margin: 15px 0px;
  font-weight: bold;
  font-size: 30px;
  color: ${props => props.theme.terra};
`;

const ContainerDesc = styled.div`
  font-size: 16px;
  margin-bottom: 15px;
  font-weight: bold;
  color: ${props => props.theme.terra};
`;

const ContainerBtn = styled.div`
  a {
    margin: 17px 0px;

    img {
      &:hover {
        border-radius: 6px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
      }
    }
  }
`;

const ContainerImg = styled.div`
  dispaly: flex;

  span {
    padding: 10px 0px;
    font-size: 80px;
  }
`;

const ContainerLinks = styled.div`
  padding: 20px;
  margin: 10px 40px;
  display: flex;
  justify-content: space-around;
  width: 400px;
`;

const ContainerSignup = styled.span`
  color: #666d75;
  font-size: 14px;
`;

const ContainerSpan = styled.span`
  color: #666d75;
  font-size: 15px;
`;
