import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyPageBox from '../../components/MyPageBox';
import BookedList from '../../components/BookedList';

function Mypage() {
  const navigate = useNavigate();
  const point = 1000;
  const conf = () => {
    // let result = window.confirm('확인을 눌러주세요');
    // if (result) {
    //   alert('확인완료');
    // } else {
    //   alert('취소되었습니다.');
    // }
    navigate('/booking');
  };
  return localStorage.getItem('token') ? (
    <Wrapper>
      <MypageMain>
        <MyPageBox point={point} />
        <BookedList />
      </MypageMain>
    </Wrapper>
  ) : (
    conf()
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
