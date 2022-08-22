import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';

function Main() {
  const [index, setIndex] = useState(1);
  const [movies, setMovies] = useState([]);
  const [a, setA] = useState({
    id: 0,
    info_list: [],
    msg: '',
  });

  useEffect(() => {
    fetch('http://15.164.163.31:8000/movies')
      .then(res => res.json())
      .then(data => setMovies(data.result));
  }, []);

  const leftClickHandler = () => {
    return index !== 1 && setIndex(prev => prev - 1);
  };

  const rightClickHandler = () => {
    return index !== 5 && setIndex(prev => prev + 1);
  };

  const changeBtn = input => {
    setIndex(input);
  };

  const testHandle = () => {
    setA({ ...a, msg: '안녕하세요', id: 5 });
  };

  console.log(a);

  return (
    <MainWrapper>
      <span onClick={testHandle}>박스오피스</span>
      {a.msg}
      <Carousel
        index={index}
        movies={movies}
        leftClickHandler={leftClickHandler}
        rightClickHandler={rightClickHandler}
        changeBtn={changeBtn}
      />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 50px 100px;
  background-color: rgb(21, 16, 15);
  color: white;
  text-align: center;
  span {
    padding-bottom: 10px;
    font-size: larger;
  }
`;

export default Main;
