import React from 'react';
import styled from 'styled-components';

export default function Card({ post }) {
  return (
    <CardContainer>
      <MovieImgContainer>
        <MovieImg src={post.images_url} alt="영화포스터" />
      </MovieImgContainer>
      <ContentContainer>
        <PostCardContent>{post.movie_name}</PostCardContent>
        <PostCardContent>{post.user_name}</PostCardContent>
        <PostCardContent>{post.content}</PostCardContent>
        <DeleteLikeConatiner>
          <LikeContainer>
            <i class="fa-regular fa-heart" />
            {post.like}
          </LikeContainer>
          <DeleteContainer>
            <i class="fa-regular fa-trash-can" />
          </DeleteContainer>
        </DeleteLikeConatiner>
      </ContentContainer>
    </CardContainer>
  );
}

const LikeContainer = styled.div``;
const DeleteContainer = styled.div`
  margin-right: 10px;
  margin-left: 10px;
`;

const CardContainer = styled.div`
  width: 300px;
  height: 500px;
  border: 1px solid black;
  margin: 0 30px 70px 30px;
  border-radius: 10px;
`;

const MovieImgContainer = styled.div`
  height: 50%;
  margin-bottom: 10px;
`;
const MovieImg = styled.img`
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
  border-top-radius: 10px;
  border-radius: 15px 15px 0 0;
`;

const ContentContainer = styled.div`
  width: 100%;
  border-top: 1px solid black;
`;

const PostCardContent = styled.span`
  display: flex;
  padding: 10px 20px;
  white-space: wrap;
`;

const DeleteLikeConatiner = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
`;
