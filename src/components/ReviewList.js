import React from 'react';
import styled from 'styled-components';

function ReviewList({ userReviews }) {
  return (
    <ListBox>
      <ReviewTitle>리뷰 내역 ({userReviews.length})</ReviewTitle>
      {userReviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </ListBox>
  );
}

export default ReviewList;

const ReviewItem = ({ review }) => {
  return (
    <ReviewBox>
      영화:
      <ReviewMovie>{review.movie_name}</ReviewMovie>
      {review.content}
    </ReviewBox>
  );
};

const ListBox = styled.div`
  width: 100%;
  margin-bottom: 70px;
`;

const ReviewTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 15px;
  border-bottom: 1px solid;
`;

const ReviewBox = styled.div`
  padding: 20px 50px;
  border-bottom: 1px solid #bbb;
`;

const ReviewMovie = styled.span`
  color: blue;
  margin: 0 10px;
`;
