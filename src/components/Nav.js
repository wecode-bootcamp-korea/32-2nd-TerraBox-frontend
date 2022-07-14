import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DropDown from './DropDown';

function Nav() {
  const [drop, setDrop] = useState(false);
  const logOutProcess = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    localStorage.removeItem('profileIcon');
    window.location.reload();
  };

  const location = useLocation();

  const detectLocation = location.pathname === '/';

  const dropDownMenu = () => {
    setDrop(prev => !prev);
  };

  const dropDownOff = () => {
    setDrop(false);
  };

  return (
    <>
      <NavWrapper detectLocation={detectLocation}>
        <Navigators>
          <NavElements onClick={dropDownOff}>영화</NavElements>
          <NavElements onClick={dropDownOff}>
            <Link to="/booking">예매</Link>
          </NavElements>
          <NavElements onClick={dropDownOff}>극장</NavElements>
        </Navigators>
        <Link to="/">
          <LogoImage
            alt="테라박스로고"
            src={
              detectLocation
                ? '/images/MainNavLogo.png'
                : '/images/TerraBoxLogoNewWhite.png'
            }
            detectLocation={detectLocation}
          />
        </Link>
        <Navigators>
          <NavElements onClick={dropDownOff}>이벤트</NavElements>
          <NavElements onClick={dropDownOff}>스토어</NavElements>
          <i className="fa-solid fa-user" onClick={dropDownMenu} />
        </Navigators>
      </NavWrapper>
      {drop && <DropDown setDrop={setDrop} />}
      {localStorage.getItem('token') ? (
        <LoginText detectLocation={detectLocation} onClick={logOutProcess}>
          로그아웃
        </LoginText>
      ) : (
        <Link to="/login">
          <LoginText detectLocation={detectLocation}>로그인</LoginText>
        </Link>
      )}
    </>
  );
}

export default Nav;

const NavWrapper = styled.div`
  text-decoration: none;
  position: sticky;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  text-align: center;
  padding: 30px 100px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.3);
  color: ${props => (props.detectLocation ? 'white' : 'rgb(25, 16, 15)')};
  background-color: ${props =>
    props.detectLocation ? 'rgb(25, 16, 15)' : 'white'};

  a {
    text-decoration: none;
    color: ${props => (props.detectLocation ? 'white' : 'rgb(25, 16, 15)')};
  }
`;

const Navigators = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  font-size: 23px;

  .fa-user {
    color: ${props => props.theme.lightgreen};
    cursor: pointer;
  }
`;

const NavElements = styled.div`
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: ${props => (props.detectLocation ? '155px' : '255px')};
  cursor: pointer;
`;

const LoginText = styled.div`
  position: absolute;
  color: ${props => (props.detectLocation ? 'white' : 'black')};
  top: 0;
  right: 20%;
  margin-top: 15px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;
