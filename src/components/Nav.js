import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function Nav() {
  const logOutProcess = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    window.location.reload();
  };

  const location = useLocation();

  const detectLocation = location.pathname === '/';

  return (
    <NavWrapper detectLocation={detectLocation}>
      <Navigators>
        <NavElements>영화</NavElements>
        <NavElements>
          <Link to="/booking">예매</Link>
        </NavElements>
        <NavElements>극장</NavElements>
      </Navigators>
      <Link to="/">
        <img
          alt="테라박스로고"
          src={
            detectLocation
              ? '/images/TerraBoxLogoNewBlack.png'
              : '/images/TerraBoxLogoNewWhite.png'
          }
        />
      </Link>
      <Navigators>
        <NavElements>이벤트</NavElements>
        <NavElements>스토어</NavElements>
        {localStorage.getItem('token') ? (
          <>
            <NavElementsLoggedIn>
              {localStorage.getItem('nickname')}님
            </NavElementsLoggedIn>
            <NavElementsLoggedIn onClick={logOutProcess}>
              로그아웃
            </NavElementsLoggedIn>
          </>
        ) : (
          <Link to="/login">
            <i className="fa-solid fa-user" pathname={location.pathname} />
          </Link>
        )}
      </Navigators>
    </NavWrapper>
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

  img {
    width: 260px;
    cursor: pointer;
  }

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
  }
`;

const NavElements = styled.div`
  cursor: pointer;
`;

const NavElementsLoggedIn = styled.div`
  cursor: pointer;
  font-size: 20px;
  color: ${props => props.theme.gold};
`;
