import styled from 'styled-components';
import BottomDetail from './BottomDetail';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Detail() {
  const [data, setData] = useState({});
  const [dep, setDep] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetch(`http://15.164.163.31:8000/movies/${id}`)
      .then(response => response.json())
      .then(data => setData(data.result));
  }, [dep]);

  return (
    data.id && (
      <Wrapper>
        <MovieInfo>
          <MovieTitleRate>
            <MovieTitle>
              <MovieKoreanTitle>{data.name}</MovieKoreanTitle>
              <MovieEnglishTitle>{data.eng_name}</MovieEnglishTitle>
            </MovieTitle>
            <MovieBookingRate>
              <MovieBooking>
                <Link to="/booking">
                  <MovieBookingButton>예매하기</MovieBookingButton>
                </Link>
              </MovieBooking>
            </MovieBookingRate>
          </MovieTitleRate>
          <MoviePosterBooking>
            <MoviePosterContainer>
              <MoviePoster src={data.stillcut_urls[0]} alt="영화포스터" />
            </MoviePosterContainer>
          </MoviePosterBooking>
        </MovieInfo>
        <ContentData>
          <BottomDetail setDep={setDep} setData={setData} movieData={data} />
        </ContentData>
      </Wrapper>
    )
  );
}

const Wrapper = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0;
`;
const MovieInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: auto;
  padding-right: 100px;
  padding-left: 100px;
  background-color: rgb(18, 18, 18);
`;

const MovieTitleRate = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const MovieTitle = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 100%;
  font-size: 50px;
  margin-left: 30px;
`;

const MovieKoreanTitle = styled.div`
  width: 100%;
  font-size: 80px;
  color: white;
  margin-top: 60px;
`;
const MovieEnglishTitle = styled.div`
  width: 100%;
  font-size: 40px;
  margin-top: 10px;
  color: white;
`;

const MovieBookingRate = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
`;

const MoviePosterBooking = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const MoviePosterContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const MoviePoster = styled.img`
  width: 300px;
  height: 400px;
  margin: auto;
  margin-right: 100px;
`;
const MovieBooking = styled.div`
  width: 25%;
  height: 100%;
  margin-left: 20px;
`;

const MovieBookingButton = styled.button`
  background-color: lightgray;
  color: white;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  font-size: 20px;

  &:hover {
    background-color: rgb(40, 64, 46);
  }
`;

const ContentData = styled.div`
  width: 100%;
  height: auto;
  margin-top: 50px;
  padding-right: 100px;
  padding-left: 100px;
`;
