import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';
import Card from './Card';

function  PostCards({ moviePosts, moviesCount }) {
  const [file, setFile] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function handleUpload(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

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
      setTimeout(resolve, 1000);
    });
  }

  return (
    <MoviePostcontainer>
      <MoviePostInfo>
        영화에 대한 감상평 {moviesCount} 개가 있어요!
      </MoviePostInfo>
      <WriteMoviePostContainer>
        <ToggleOpenButton onClick={toggleModal}>
          <CommentIconContainer>
            <i class="fa-solid fa-pencil" />
          </CommentIconContainer>
          <WirteComment>무비포스트 쓰기</WirteComment>
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
          <MoviePostContainer>
            <TitleContainer>
              <PostTitle>무비포스트 작성하기</PostTitle>
            </TitleContainer>
            <UploadImgContainer>
              <Image
                src={file}
                onError={e => {
                  e.target.onerror = null;
                }}
              />
              <UploadImg type="file" accept="image/*" onChange={handleUpload} />
              <PostComment
                type="text"
                placeholder="영화 관람평을 남겨주세요."
              />
            </UploadImgContainer>
            <ButtonContainer>
              <ToggleCloseButton onClick={toggleModal}>닫기</ToggleCloseButton>
              <AddComment onClick={toggleModal}>등록</AddComment>
            </ButtonContainer>
          </MoviePostContainer>
        </StyledModal>
      </WriteMoviePostContainer>
      <MoviePostBottom>
        {moviePosts.map(post => (
          <Card key={post.images_url} post={post} />
        ))}
      </MoviePostBottom>
    </MoviePostcontainer>
  );
}

export default function PostCard({ moviePosts, movieCount }) {
  return (
    <ModalProvider backgroundComponent={FadingBackground}>
      <PostCards moviePosts={moviePosts} moviesCount={movieCount} />
    </ModalProvider>
  );
}
const FadingBackground = styled(BaseModalBackground)`
  opacity: ${props => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const MoviePostcontainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const WriteMoviePostContainer = styled.div`
  width: 100%;
  height: 80px;
  border: 3px solid rgb(235, 235, 235);
  display: flex;
  margin-top: 20px;
  align-items: center;
  border-radius: 10px;
  align-self: center;
`;

const MoviePostBottom = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: flex-start;
  align-items: center;
  padding: 0 50px;
`;
const MoviePostInfo = styled.span`
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 30px;
  margin-left: 20px;
  margin-top: 30px;
  color: green;
`;

const ToggleOpenButton = styled.button`
  width: 200px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  height: 50px;
  margin-right: 20px;
  border-radius: 10px;
`;

const CommentIconContainer = styled.div`
  font-size: 15px;
  margin-right: 5px;
`;

const WirteComment = styled.div`
  font-size: 20px;
`;

const MoviePostContainer = styled.div`
  width: 600px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 750px;
`;

const ButtonContainer = styled.div`
  width: 180px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;
`;
const ToggleCloseButton = styled.button`
  width: 70px;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  color: rgb(40, 64, 46);
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

const PostTitle = styled.div`
  width: 100%;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
const UploadImgContainer = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const UploadImg = styled.input`
  margin-top: 10px;
`;
const Image = styled.img`
  width: 400px;
  height: 400px;
`;

const PostComment = styled.textarea`
  height: 100px;
  width: 500px;
  margin-top: 20px;
  font-size: 15px;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(40, 64, 46);
  border-radius: 10px;
`;

const StyledModal = Modal.styled`
  width: 40rem;
  height: 50rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${props => props.opacity};
  transition : all 0.3s ease-in-out;
`;
