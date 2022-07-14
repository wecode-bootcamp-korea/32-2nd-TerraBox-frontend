import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoggedInDrop from './LoggedInDrop';

function DropDown({ setDrop }) {
  const noDropDown = () => {
    setDrop(prev => !prev);
  };

  return (
    <DropMenu>
      {localStorage.getItem('token') ? (
        <LoggedInDrop setDrop={setDrop} />
      ) : (
        <LoginDrop>
          <LoginMessage>
            로그인 하시면 나의 테라박스를 만날 수 있어요.
          </LoginMessage>
          <LoginMessage>
            영화를 사랑하는 당신을 위한 꼭 맞는 혜택까지 확인해 보세요!
          </LoginMessage>
          <Link to="/login">
            <LoginButton onClick={noDropDown}>로그인</LoginButton>
          </Link>
        </LoginDrop>
      )}
    </DropMenu>
  );
}

export default DropDown;

const DropMenu = styled.div`
  position: absolute;
  bottom: -10;
  width: 100%;
  z-index: 30;
  background-color: ${props => props.theme.lightgreen};
`;

const LoginDrop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 40px;
`;

const LoginMessage = styled.div`
  margin-bottom: 10px;
  text-align: center;
  color: white;
`;

const LoginButton = styled.button`
  width: 120px;
  height: 40px;
  margin-top: 25px;
  background-color: transparent;
  border: 1px solid white;
  border-radius: 5px;
  text-align: center;
  color: white;
  cursor: pointer;
`;
