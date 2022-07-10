import React from 'react';
import styled from 'styled-components';

const AllMovieList = ({
  movieData,
  selectedMovie,
  setSelectedMovie,
  setSelectedTheater,
  setSelectedRegion,
  setRegionTheaters,
  setTimeData,
}) => {
  const selectMovie = id => {
    const selectedObject = movieData.find(({ movie_id }) => movie_id === id);
    setSelectedMovie(selectedObject.movie_id);
    setSelectedTheater('');
    setSelectedRegion('');
    setRegionTheaters([]);
    setTimeData([]);
  };

  return (
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
  );
};

export default AllMovieList;

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
`;

const MovieListMovieName = styled.div`
  font-size: 13px;
  width: 174px;
  margin-left: 10px;
  color: ${props => (props.selectedMovie === props.movie ? 'white' : 'black')};
`;
