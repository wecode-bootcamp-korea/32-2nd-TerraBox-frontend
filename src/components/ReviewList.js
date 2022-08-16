import React from 'react';
import styled from 'styled-components';

function ReviewList({ userReviews }) {
  return (
    <ListBox>
      <ReviewTitle>리뷰 내역 ({userReviews.length})</ReviewTitle>
      <ItemList>
        {userReviews.length ? (
          userReviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))
        ) : (
          <NoReview>작성한 리뷰 내역이 아직 없습니다</NoReview>
        )}
      </ItemList>
    </ListBox>
  );
}

export default ReviewList;

const ReviewItem = ({ review }) => {
  return (
    <ReviewBox>
      {review.content}
      <ReviewMovie>{review.movie_name}</ReviewMovie>
    </ReviewBox>
  );
};

const ListBox = styled.div`
  width: 100%;
  margin-bottom: 150px;
`;

const ReviewTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 15px;
  border-bottom: 1px solid;
`;

const ItemList = styled.div`
  height: 300px;
  overflow: scroll;
`;

const ReviewBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #bbb;
`;

const ReviewMovie = styled.span`
  font-weight: 600;
  margin: 0 10px;
`;

const NoReview = styled.div`
  padding: 20px 0;
  font-size: 20px;
`;
