import styled from 'styled-components';
import { useState } from 'react';

export default function MovieInfo({ movieInfo }) {
  const [toggle, setToggle] = useState(false);

  const heightChange = () => {
    setToggle(prev => !prev);
  };

  return (
    <>
      <MovieSummaryContainer toggle={toggle}>
        <MovieContent>{movieInfo}</MovieContent>
      </MovieSummaryContainer>
      <ShowMoreTextBtn onClick={heightChange}>
        {toggle ? '닫기' : '더보기'}
      </ShowMoreTextBtn>
    </>
  );
}

const MovieContent = styled.div`
  display: block;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: pre-line;
  line-height: 2;
`;

const ShowMoreTextBtn = styled.button`
  width: 100%;
  height: 30px;
  margin-bottom: 40px;
  margin-top: 20px;
`;

const MovieSummaryContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  height: ${props => (props.toggle ? '' : '70px')};
  overflow: ${props => props.toggle || 'hidden'};
`;