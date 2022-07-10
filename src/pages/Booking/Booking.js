import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import styled from 'styled-components';
import AllMovieList from './AllMovieList';
import AllTheatersList from './AllTheatersList';
import AllTimeList from './AllTimeList';
import { requestMovieApi } from './module/requestMoviApi';
import { requestTimeData } from './module/requsetTimeAPI';
=======
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
>>>>>>> 522e9c767ac5980c50b910d8f2403c5124d4d157

function Booking() {
  const [movieData, setMovieData] = useState([]);
  const [theatersData, setTheatersData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [regionTheaters, setRegionTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState('');
<<<<<<< HEAD

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
=======
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://15.164.163.31:8000/Reserve/movie')
      .then(res => res.json())
      .then(data => {
        setMovieData(data.movies);
      });
  }, []);

  useEffect(() => {
    fetch('http://15.164.163.31:8000/Reserve/region')
      .then(res => res.json())
      .then(data => {
        setTheatersData(data.regions);
      });
  }, []);

  useEffect(() => {
    fetch(
      // `http://15.164.163.31:8000/Reserve/movietheater?movie_id=${selectedMovie}&theater_id=${selectedTheater}`
      'http://15.164.163.31:8000/Reserve/movietheater?movie_id=1&theater_id=1'
    )
      .then(res => res.json())
      .then(data => {
        if (selectedMovie && selectedRegion && selectedTheater) {
          setTimeData(data.timetable);
        }
      });
  }, [selectedMovie, selectedTheater, selectedRegion]);

  const selectMovie = id => {
    const selectedObject = movieData.find(({ movie_id }) => movie_id === id);
    setSelectedMovie(selectedObject.movie_id);
    setSelectedTheater('');
    setSelectedRegion('');
    setRegionTheaters([]);
    setTimeData([]);
  };

  const selectRegion = id => {
    const selectedObject = theatersData.find(
      ({ region_id }) => region_id === id
    );
    setRegionTheaters(selectedObject.theaters);
    setSelectedRegion(selectedObject.region_id);
  };

  const selectTheater = id => {
    const selectedObject = regionTheaters.find(
      ({ theater_id }) => theater_id === id
    );
    setSelectedTheater(selectedObject.theater_id);
  };

  const goToSeat = () => {
    navigate('/seat', {
      state: {
        movie_theater_id: selectedTheater,
      },
    });
  };
  return (
    <StyledWrapper>
      <Title>빠른예매</Title>
      <bookingbigwrapper>
        <BookinWrapper>
          <MovieWrapper>
            <MovieTitle>영화</MovieTitle>
            <MovieSelector>
              <MovieSelectorText>전체</MovieSelectorText>
            </MovieSelector>
            <MovieListWrapper>
              {movieData.map(movie => (
                <MovieList
                  key={movie.movie_id}
                  movie={movie.movie_id}
                  selectedMovie={selectedMovie}
                >
                  <img src={movie.age_grade} alt="영화관람가" />
                  <MovieListMovieName
                    movie={movie.movie_id}
                    selectedMovie={selectedMovie}
                    onClick={() => selectMovie(movie.movie_id)}
                  >
                    {movie.movie_name}
                  </MovieListMovieName>
                </MovieList>
              ))}
            </MovieListWrapper>
          </MovieWrapper>
          <TheatersWrapper>
            <TheatersTitle>극장</TheatersTitle>
            <TheatersSelector>
              <TheatersSelectorText>전체</TheatersSelectorText>
            </TheatersSelector>
            <TheatersRegionWrapper>
              <TheatersListWrapper>
                {theatersData &&
                  theatersData.map(theatersData => {
                    return (
                      <TheatersList
                        key={theatersData.region_id}
                        theater={theatersData.region_id}
                        selectedRegion={selectedRegion}
                      >
                        <div
                          onClick={() => selectRegion(theatersData.region_id)}
                        >
                          {theatersData.region_name}(
                          {theatersData.theaters.length})
                        </div>
                      </TheatersList>
                    );
                  })}
              </TheatersListWrapper>
              <RegionTheatersListWrapper>
                {regionTheaters.map(item => {
                  return (
                    <RegionItem
                      key={item.theater_id}
                      regionId={item.theater_id}
                      regionTheatersId={selectedTheater}
                    >
                      <div
                        onClick={() => selectTheater(item.theater_id)}
                        regionId={item.theater_id}
                        regionTheatersId={selectedTheater}
                      >
                        {item.theater_name}
                      </div>
                    </RegionItem>
                  );
                })}
              </RegionTheatersListWrapper>
            </TheatersRegionWrapper>
          </TheatersWrapper>
          <TimeWrapper>
            <TimeTitle>시간</TimeTitle>
            {timeData.map(time => (
              <TimeLine key={time.timetable_id} onClick={goToSeat}>
                <Rightcontent>
                  <Starttime>{time.start_time}</Starttime>
                  <Endtime>{time.end_time}</Endtime>
                </Rightcontent>
                <Centercontent>
                  <Moviecontent>
                    {time.movies_name}
                    <Screening>{time.screening_type}D</Screening>
                  </Moviecontent>
                </Centercontent>
                <Leftcontent>
                  {time.theater_name}
                  <Room>{time.room_name}</Room>
                  <Seatcount>
                    <Nowseat>{time.able_seat_count}/</Nowseat>
                    {time.tatal_seat_count}
                  </Seatcount>
                </Leftcontent>
              </TimeLine>
            ))}
          </TimeWrapper>
        </BookinWrapper>
      </bookingbigwrapper>
>>>>>>> 522e9c767ac5980c50b910d8f2403c5124d4d157
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
<<<<<<< HEAD
  border-top: 1px solid black !important;
  border: 1px solid #d8d9db;
`;
=======
  /* height: 530px; */
  border-top: 1px solid black !important;
  border: 1px solid #d8d9db;
`;
const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  border-right: 1px solid #d8d9db;
`;

const MovieTitle = styled.div`
  color: #222;
  font-size: 20px;
  line-height: 38px;
  padding: 20px 0 0 20px;
`;

const MovieSelector = styled.div`
  padding: 18px;
`;

const MovieSelectorText = styled.div`
  border: 1px solid #d8d9db;
  border-bottom: none;
  height: 35px;
  font-size: 16px;
  text-align: center;
  margin-top: 10;
  padding-top: 6px;
`;

const MovieListWrapper = styled.div`
  padding: 10px 18px 0 20px;
  height: 290px;
`;

const MovieList = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  padding: 4px 0px 4px 7px;
  background-color: ${props =>
    props.selectedMovie === props.movie ? 'gray' : 'white'};
  cursor: pointer;
`;

const MovieListMovieName = styled.div`
  font-size: 13px;
  width: 174px;
  margin-left: 10px;
  color: ${props => (props.selectedMovie === props.movie ? 'white' : 'black')};
`;

const TheatersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  border-right: 1px solid #d8d9db;
`;
const TheatersTitle = styled.div`
  color: #222;
  font-size: 20px;
  line-height: 38px;
  padding: 20px 0 0 20px;
`;

const TheatersSelector = styled.div`
  padding: 18px;
  > div {
    border: 1px solid #d8d9db;
    border-bottom: none;
    height: 35px;
    font-size: 16px;
    text-align: center;
    margin-top: 10;
    padding-top: 6px;
  }
`;

const TheatersListWrapper = styled.div`
  padding-left: 20px;
`;

const TheatersRegionWrapper = styled.div`
  display: flex;
`;

const TheatersList = styled.div`
  display: flex;
  padding-bottom: 7px;
  background-color: ${props =>
    props.theater === props.selectedRegion ? 'gainsboro' : 'white'};
  cursor: pointer;

  > div {
    padding: 6px 0px 5px 10px;
    font-size: 13px;
  }
`;

const RegionTheatersListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RegionItem = styled.div`
  display: flex;
  padding-bottom: 7px;
  background-color: ${props =>
    props.regionId === props.regionTheatersId ? 'gray' : 'white'};
  cursor: pointer;

  > div {
    padding: 6px 70px 5px 10px;
    font-size: 13px;
    color: ${props =>
      props.regionId === props.regionTheatersId ? 'white' : 'black'};
  }
`;

const TheatersSelectorText = styled.div`
  border: 1px solid #d8d9db;
  border-bottom: none;
  height: 35px;
  font-size: 16px;
  text-align: center;
  margin-top: 10;
  padding-top: 6px;
`;

const TimeWrapper = styled.div`
  /* width: 500px; */
  /* height: 290px; */
`;

const TimeTitle = styled.div`
  color: #222;
  font-size: 20px;
  line-height: 38px;
  padding: 20px 0 0 20px;
`;

const TimeLine = styled.div`
  border: 1px solid #d8d9db;
  border-left: none;
  border-right: none;
  border-bottom: none;
  width: 558px;
  height: 52px;
  display: flex;
  cursor: pointer;

  &:hover {
    background-color: gainsboro;
  }
`;

const Rightcontent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 25px;
  align-items: center;
`;

const Starttime = styled.div`
  font-weight: bold;
`;

const Endtime = styled.div`
  font-weight: 100;
`;

const Centercontent = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
`;

const Moviecontent = styled.div`
  font-size: 17px;
  width: 250px;
`;

const Screening = styled.div`
  font-size: 13px;
`;

const Leftcontent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  font-size: 15px;
  padding-left: 130px;
`;

const Seatcount = styled.div`
  display: flex;
  border: 1px solid #d8d9db;
`;
const Room = styled.div``;

const Nowseat = styled.div`
  color: #01738a;
`;
>>>>>>> 522e9c767ac5980c50b910d8f2403c5124d4d157
