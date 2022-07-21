import React from 'react';
import styled from 'styled-components';
import MyPageBox from '../../components/MyPageBox';
import BookedList from '../../components/BookedList';

function Mypage() {
  const point = 1000;
  return (
    <Wrapper>
      <MypageMain>
        <MyPageBox point={point} />
        <BookedList />
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
