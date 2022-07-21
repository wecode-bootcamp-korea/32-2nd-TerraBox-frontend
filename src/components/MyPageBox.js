import React from 'react';
import styled from 'styled-components';

function MyPageBox({ point }) {
  return (
    <UserInfo>
      <UserImage src={localStorage.getItem('profileIcon')} />
      <UserGrade>
        <UserGrade>{localStorage.getItem('nickname')}님은</UserGrade>
        <UserGrade>일반등급입니다.</UserGrade>
      </UserGrade>
      <UserPoint>
        <UserPointText>총 보유 포인트</UserPointText>
        <Points>{point.toLocaleString()}P</Points>
      </UserPoint>
    </UserInfo>
  );
}

export default MyPageBox;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #eaebed;
  border-radius: 10px;
  padding: 50px;
  margin-bottom: 80px;
`;

const UserImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 30px;
`;

const UserGrade = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
`;

const UserPoint = styled.div`
  width: 40%;
`;

const UserPointText = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Points = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: ${props => props.theme.lightgreen};
`;
