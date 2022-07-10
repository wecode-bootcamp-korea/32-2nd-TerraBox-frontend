import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';
import { Rating } from 'react-simple-star-rating';
import { useParams } from 'react-router-dom';

function CommentModal({ setData, setDep, movieTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [rating, setRating] = useState(0);
  const [count, setCount] = useState(0);
  const params = useParams();
  const [comment, setComment] = useState();

  const clickUploadCommtent = () => {
    fetch(`http://15.164.163.31:8000/movies/${params.id}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        content: comment,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'created!') {
          fetch(`http://15.164.163.31/movies/${params.id}`).then(res =>
            res.json()
          );
        }
      });
    setDep(comment);
    setIsOpen(false);
  };

  const handleRating = rate => {
    setRating(rate / 20);
  };

  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise(resolve => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  const areaInput = e => {
    setCount(e.target.value.length);
    setComment(e.target.value);
  };
  return (
    <ModalContainer>
      <ToggleOpenButton onClick={toggleModal}>
        <CommentIconContainer>
          <i class="fa-solid fa-pencil" />
        </CommentIconContainer>
        <WriteComment>관람평 쓰기</WriteComment>
      </ToggleOpenButton>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <WriteCommentContainer>
          <WriteCommentTitleContainer>
            <WriteCommentTitle>관람평 작성하기</WriteCommentTitle>
          </WriteCommentTitleContainer>
          <CommentMovieTitle>
            <MovieTitleTop>{movieTitle}</MovieTitleTop>
            <MovieTitleBottom>영화 어떠셨나요?</MovieTitleBottom>
          </CommentMovieTitle>
          <WriteCommentBottomContainer>
            <CommentStarContainer>
              <StarContainerTop>
                <StarContainer>
                  <Rating onClick={handleRating} ratingValue={rating} />
                </StarContainer>
                <StarCounter>
                  <StarNumber>{rating}</StarNumber>
                  <StarScore>점</StarScore>
                </StarCounter>
              </StarContainerTop>
              <CommentBoxContainer>
                <CommentBox
                  type="text"
                  placeholder="실관람평을 남겨주세요."
                  onChange={areaInput}
                  maxLength={100}
                />
                <CommentCounterContainer>
                  <CommentCounter>{count} / 100</CommentCounter>
                </CommentCounterContainer>
              </CommentBoxContainer>
            </CommentStarContainer>
            <ButtonContainer>
              <ToggleCloseButton onClick={toggleModal}>취소</ToggleCloseButton>
              <AddComment onClick={clickUploadCommtent}>등록</AddComment>
            </ButtonContainer>
          </WriteCommentBottomContainer>
        </WriteCommentContainer>
      </StyledModal>
    </ModalContainer>
  );
}

function CommentTitle({ setDep }) {
  return (
    <ModalProvider backgroundComponent={FadingBackground}>
      <CommentModal setDep={setDep} />
    </ModalProvider>
  );
}

const CommentBoxContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CommentCounterContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  margin-left: 20px;
`;

const CommentCounter = styled.span`
  width: 100px;
  height: 20px;
  margin-left: 390px;
`;
const StarNumber = styled.div`
  margin-left: 10px;
  font-size: 45px;
  width: 100px;
`;

const StarScore = styled.span`
  font-size: 45px;
  margin-left: 10px;
`;

const StarContainerTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const StarCounter = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 30px;
  border-left: 1px solid black;
  display: flex;
  align-items: center;
  font-weight: lighter;
`;

const StyledModal = Modal.styled`
  width: 40rem;
  height: 50rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${props => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const ModalContainer = styled.div`
  width: 150px;
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const CommentIconContainer = styled.div`
  font-size: 15px;
  margin-right: 5px;
  color: rgb(102, 102, 102);
`;

const WriteComment = styled.div`
  font-size: 15px;
  color: rgb(102, 102, 102);
`;

const ToggleOpenButton = styled.button`
  width: 130px;
  height: 100px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-left: -20px;
`;
const ToggleCloseButton = styled.button`
  width: 70px;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  color: rgb(40, 64, 46);
  font-size: 20px;
`;

const WriteCommentContainer = styled.div`
  width: 600px;
  border: 1px solid black;
  height: 750px;
  border-radius: 10px;
`;

const WriteCommentTitleContainer = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(40, 64, 46);
  border-radius: 10px;
`;

const WriteCommentTitle = styled.div`
  width: 100%;
  height: 90px;
  margin: 0 auto;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const WriteCommentBottomContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const CommentStarContainer = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentMovieTitle = styled.div`
  width: 80%;
  height: 100px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const MovieTitleTop = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;
const MovieTitleBottom = styled.div`
  font-size: 20px;
`;

const CommentBox = styled.textarea`
  width: 300px;
  height: 200px;
  margin-top: 20px;
  font-size: 20px;
`;

const AddComment = styled.button`
  width: 70px;
  height: 50px;
  color: white;
  border-radius: 10px;
  background-color: rgb(40, 64, 46);
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  width: 180px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${props => props.opacity};
  transition: all 0.3s ease-in-out;
`;

export default CommentTitle;
