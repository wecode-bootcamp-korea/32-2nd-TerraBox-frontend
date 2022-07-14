import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function LoggedInDrop({ setDrop }) {
  const noDropDown = () => {
    setDrop(prev => !prev);
  };

  return (
    <Wrapper>
      <UserInfoSection>
        <UserInfo>
          <InfoText>안녕하세요!</InfoText>
          <InfoText>
            <Bold>{localStorage.getItem('nickname')} </Bold>회원님
          </InfoText>
        </UserInfo>
        <Link to="/mypage">
          <MypageButton onClick={noDropDown}>나의 테라박스</MypageButton>
        </Link>
      </UserInfoSection>
      <PointSection>
        <InfoText>Point</InfoText>
        <SpecificText>10000</SpecificText>
      </PointSection>
      <CouponSection>
        <InfoText>쿠폰관람권</InfoText>
        <SpecificText>0</SpecificText>
      </CouponSection>
      <BookingSection>
        <InfoText>예매</InfoText>
        <SpecificText>0건</SpecificText>
      </BookingSection>
    </Wrapper>
  );
}

export default LoggedInDrop;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 60px 165px;
  height: 300px;
  color: white;
`;

const Box = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
`;

const UserInfoSection = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  justify-content: space-between;
  border-right: 0.1px solid white;
  margin-right: 50px;
`;

const UserInfo = styled.div``;

const InfoText = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Bold = styled.span`
  font-weight: 600;
  font-size: 23px;
`;

const MypageButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: transparent;
  border: 1px solid white;
  border-radius: 5px;
  text-align: center;
  color: white;
  cursor: pointer;
`;

const PointSection = styled(Box)``;
const CouponSection = styled(Box)``;
const BookingSection = styled(Box)``;

const SpecificText = styled.div`
  font-size: 30px;
`;
