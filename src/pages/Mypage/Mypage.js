import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyPageBox from '../../components/MyPageBox';
import BookedList from '../../components/BookedList';
import ReviewList from '../../components/ReviewList';

function Mypage() {
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState([]);
  const point = 1000;

  // useEffect(() => {
  //   fetch('http://15.164.163.31:8000/reviews/usermoviereviews', {
  //     method: 'GET',
  //     headers: { Authorization: localStorage.getItem('token') },
  //   })
  //     .then(res => res.json())
  //     .then(data => setUserReviews(data.moviereviews));
  // }, []);

  useEffect(() => {
    fetch('http://15.164.163.31:8000/reviews/usermovieposts', {
      method: 'GET',
      headers: { Authorization: localStorage.getItem('token') },
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <Wrapper>
      <MypageMain>
        <MyPageBox point={point} />
        <BookedList />
        <ReviewList userReviews={userReviews} />
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
