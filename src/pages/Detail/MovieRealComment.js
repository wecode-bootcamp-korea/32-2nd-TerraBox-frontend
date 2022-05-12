import styled from 'styled-components';
import Comment from './Comment';
import CommentTitle from './CommentModal';

export default function MovieRealComment({
  setDep,
  setData,
  movieComments,
  movieTitle,
  movieCount,
}) {
  return (
    <>
      <TotalComment>
        {movieTitle} 에 대한 {movieCount} 개의 이야기가 있어요!
      </TotalComment>
      <MovieCommentContainer>
        <MovieCommentRows>
          <UserComment>
            <UserIdContainer>
              <UserIconContainer>
                <UserIconTop>
                  <i class="fa-solid fa-circle" />
                  <UserIconBottom>
                    <i class="fa-solid fa-t" />
                  </UserIconBottom>
                </UserIconTop>
                <UserId>TerraBox</UserId>
              </UserIconContainer>
            </UserIdContainer>
            <AddComment>
              <AddCommentBox>
                <DefaultComment>
                  "{movieTitle} 재밋게 보셨나연? 영화의 어떤 점이 좋았는지
                  이야기해주세요"
                </DefaultComment>
              </AddCommentBox>
            </AddComment>
            <CommentTitle setData={setData} setDep={setDep} />
          </UserComment>
          <AllMovieComment>
            {movieComments.map((comment, index) => (
              <Comment key={index} setData={setData} comment={comment} />
            ))}
          </AllMovieComment>
        </MovieCommentRows>
      </MovieCommentContainer>
    </>
  );
}

const DefaultComment = styled.div`
  margin-left: 20px;
`;

const TotalComment = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 30px;
  margin-top: 20px;
  margin-left: 20px;
  color: green;
`;
const MovieCommentContainer = styled.div`
  width: 100%;
  margin-top: 50px;
`;

const MovieCommentRows = styled.div`
  width: 100%;
  height: 100%;
`;

const UserComment = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  height: 100px;
`;

const UserIdContainer = styled.div`
  width: 130px;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  margin-top: 15px;
`;
const UserIconTop = styled.div`
  font-size: 70px;
  // position: relative;
  // z-index: 1;
  margin-left: 5px;
`;

const UserIconBottom = styled.div`
  position: relative;
  z-index: 2;
  left: 23px;
  top: -50px;
  color: white;
  font-size: 30px;
`;
const UserId = styled.span`
  margin-top: -20px;
  margin-bottom: 20px;
  margin-right: 10px;
`;
const UserIconContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddComment = styled.form`
  width: 100%;
  height: 100px;
  margin-left: 30px;
`;

const AddCommentBox = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  margin-left: -10px;
`;

const AllMovieComment = styled.ul`
  display: flex;
  flex-direction: column;
  width: 95%;
`;
