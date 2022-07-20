import React from 'react';
import styled from 'styled-components';

function Mypage() {
  const point = 1000;
  return (
    <Wrapper>
      <MypageMain>
        <UserInfo>
          <UserImage src={localStorage.getItem('profileIcon')} />
          <UserGrade>
            {localStorage.getItem('nickname')}님은
            <br />
            일반등급입니다.
          </UserGrade>
        </UserInfo>
        <OtherInfo>
          <UserPoint>
            <UserPointText>총 보유 포인트</UserPointText>
            <Points>{point.toLocaleString()}P</Points>
          </UserPoint>
        </OtherInfo>
      </MypageMain>
    </Wrapper>
  );
}

export default Mypage;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 100px 150px;
  padding-right: 250px;
`;

const MypageMain = styled.div`
  width: 65%;
`;

const UserInfo = styled.div`
  display: flex;
  background-color: #e4e4e4;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 50px 30px;
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 30px;
`;

const UserGrade = styled.div`
  font-size: 25px;
`;

const OtherInfo = styled.div`
  display: flex;
  background-color: #eaebed;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 20px 30px;
`;

const UserPoint = styled.div`
  width: 40%;
  border-right: 1px solid #d8d9db;
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
