import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AllMovieList from './AllMovieList';
import AllTheatersList from './AllTheatersList';
import AllTimeList from './AllTimeList';
import { requestMovieApi } from './module/requestMoviApi';
import { requestTimeData } from './module/requsetTimeAPI';

function Booking() {
  const [movieData, setMovieData] = useState([]);
  const [theatersData, setTheatersData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [regionTheaters, setRegionTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState('');

  useEffect(() => {
    requestMovieApi.getMoiveList(setMovieData);
  }, []);

  useEffect(() => {
    requestMovieApi.getRegionList(setTheatersData);
  }, []);

  useEffect(() => {
    requestTimeData({
      selectedMovie,
      selectedTheater,
      selectedRegion,
      setTimeData,
    });
  }, [selectedMovie, selectedTheater, selectedRegion]);

  return (
    <StyledWrapper>
      <Title>빠른예매</Title>

      <BookinWrapper>
        <AllMovieList
          movieData={movieData}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          setSelectedTheater={setSelectedTheater}
          setSelectedRegion={setSelectedRegion}
          setRegionTheaters={setRegionTheaters}
          setTimeData={setTimeData}
        />
        <AllTheatersList
          theatersData={theatersData}
          selectedRegion={selectedRegion}
          regionTheaters={regionTheaters}
          setRegionTheaters={setRegionTheaters}
          setSelectedRegion={setSelectedRegion}
          selectedTheater={selectedTheater}
          setSelectedTheater={setSelectedTheater}
        />

        <AllTimeList timeData={timeData} selectedTheater={selectedTheater} />
      </BookinWrapper>
    </StyledWrapper>
  );
}

export default Booking;

const StyledWrapper = styled.div`
  width: 1100px;
  margin: 0 auto;
  margin-top: 40px;
`;

const Title = styled.div`
  font-size: 27px;
  margin-bottom: 25px;
`;

const BookinWrapper = styled.div`
  display: flex;

  width: 1100px;
  border-top: 1px solid black !important;
  border: 1px solid #d8d9db;
`;
