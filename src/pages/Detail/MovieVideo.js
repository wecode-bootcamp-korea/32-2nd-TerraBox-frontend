import styled from 'styled-components';

export default function MovieVideo({ moviePreview }) {
  return (
    <>
      <MovieTeaserContainer>
        <MovieTeaser>스폐셜 티저 영상</MovieTeaser>
      </MovieTeaserContainer>
      <VideoContainer>
        <iframe
          src={moviePreview}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
          width="1000px"
          height="500px"
        />
      </VideoContainer>
    </>
  );
}

const MovieTeaser = styled.span`
  margin-left: 20px;
  font-size: 20px;
`;

const MovieTeaserContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid lightgray;
  border-top: none;
  height: 100px;
  border-left: none;
  border-right: none;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 50px 0 50px 0;
`;
