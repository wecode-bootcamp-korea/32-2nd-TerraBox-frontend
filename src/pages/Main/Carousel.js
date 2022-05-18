import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Carousel({
  index,
  movies,
  leftClickHandler,
  rightClickHandler,
  changeBtn,
}) {
  const navigate = useNavigate();

  return (
    <CarouselWrapper>
      <Content>
        <LeftArrow
          index={index}
          src="images/lefticon.png"
          onClick={leftClickHandler}
        />
        <CarouselView>
          <CarouselElements index={index}>
            {movies.map(data => {
              return (
                <CarouselElement key={data.id}>
                  <CarouselImage
                    src={data.stillcut_url}
                    onClick={() => navigate(`/detail/${data.id}`)}
                  />
                  <MovieTitle>{data.name}</MovieTitle>
                  <Link to="/booking">
                    <BookingButton>예매</BookingButton>
                  </Link>
                </CarouselElement>
              );
            })}
          </CarouselElements>
        </CarouselView>
        <RightArrow
          index={index}
          src="images/righticon.png"
          onClick={rightClickHandler}
        />
      </Content>
      <ButtonWrapper>
        {movies.map(data => (
          <SingleButton
            key={data.id}
            id={data.id}
            index={index}
            onClick={() => changeBtn(data.id)}
          />
        ))}
      </ButtonWrapper>
    </CarouselWrapper>
  );
}

export default Carousel;

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  z-index: 3;
`;

const Arrow = styled.img`
  width: 30px;
  height: 50px;
  margin-top: 200px;
`;

const LeftArrow = styled(Arrow)`
  cursor: ${props => (props.index === 1 ? 'default' : 'pointer')};
  opacity: ${props => (props.index === 1 ? '0' : '1')};
`;

const CarouselView = styled.div`
  width: 1000px;
  overflow: hidden;
`;

const CarouselElements = styled.div`
  display: flex;
  width: 1600px;
  height: 550px;
  transform: translateX(${props => (props.index - 1) * -320}px);
  transition: transform 0.8s;
`;

const CarouselElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 550px;
  margin: 0 10px;
`;

const CarouselImage = styled.img`
  width: 300px;
  height: 400px;
  border-radius: 5%;
`;

const MovieTitle = styled.div`
  width: 300px;
  height: 50px;
  margin-top: 20px;
  font-size: large;
  font-weight: 500;
`;

const BookingButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: ${props => props.theme.terra};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: ${props => props.theme.lightgreen};
    transition: all 1s;
  }
`;

const RightArrow = styled(Arrow)`
  cursor: ${props => (props.index === 5 ? 'default' : 'pointer')};
  opacity: ${props => (props.index === 5 ? '0' : '1')};
`;

const ButtonWrapper = styled.li`
  display: flex;
  width: 100px;
  margin-top: 30px;
  justify-content: space-between;
`;

const SingleButton = styled.button`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${props =>
    props.index === props.id ? 'white' : '#707070'};
  border: none;
  border-radius: 100%;
  padding-right: 5px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;
