import styled from 'styled-components';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Comment({ setData, comment, index }) {
  const params = useParams();
  const clickDeleteButton = e => {
    fetch(
      `http://15.164.163.31:8000/movies/${params.id}/reviews/${e.target.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    ).then(response => response.json());
  };
  return (
    <OthersCommentContainer key={index}>
      <CommentUserInfo>
        <CommenterIconContainer>
          <CommenterIconTop>
            <i class="fa-solid fa-circle" />
            <CommenterIconBottom>
              <i class="fa-regular fa-user" />
            </CommenterIconBottom>
          </CommenterIconTop>
        </CommenterIconContainer>
        <CommentUserId>{comment.nickname}</CommentUserId>
      </CommentUserInfo>
      <OthersComment>
        <CommentList>{comment.content}</CommentList>
        <LikeContainer>
          <DeleteContainer
            onClick={e => {
              clickDeleteButton(e);
            }}
            id={comment.review_id}
          >
            <i class="fa-regular fa-trash-can" />
          </DeleteContainer>
          <LikeBtn>
            <i class="fa-regular fa-thumbs-up" />
          </LikeBtn>
          <CountLike>1</CountLike>
        </LikeContainer>
      </OthersComment>
    </OthersCommentContainer>
  );
}
const DeleteContainer = styled.div`
  margin-right: 10px;
  border: 1px solid black;
`;

const CommenterIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CommenterIconBottom = styled.div`
  position: relative;
  z-index: 2;
  left: 17px;
  top: -50px;
  color: white;
  font-size: 30px;
`;
const CountLike = styled.div``;

const OthersCommentContainer = styled.li`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  margin-left: 10px;
  padding-right: 10px;
`;

const OthersComment = styled.div`
  width: 1200px;
  height: 90px;
  display: flex;
  align-items: center;
  background-color: rgb(248, 248, 250);
  border: 5px solid rgb(234, 234, 234);
  border-radius: 15px;
  justify-content: space-between;
  padding-left: 20px;
`;

const CommentUserInfo = styled.div`
  width: 120px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 25px;
`;

const CommenterIconTop = styled.div`
  font-size: 30px;
  position: relative;
  z-index: 1;
  font-size: 60px;
  margin-bottom: -70px;
  color: rgb(216, 217, 219);
`;
const CommentUserId = styled.div`
  font-size: 15px;
  margin-top: 50px;
`;

const LikeContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  color: rgb(170, 170, 170);
`;
const LikeBtn = styled.div`
  font-size: 25px;
`;

const CommentList = styled.div`
  color: rgb(137, 137, 138);
`;
