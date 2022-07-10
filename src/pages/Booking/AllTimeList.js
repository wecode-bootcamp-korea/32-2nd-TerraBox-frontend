import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AllTimeList = ({ timeData, selectedTheater }) => {
  const navigate = useNavigate();
  const goToSeat = () => {
    navigate('/seat', {
      state: {
        movie_theater_id: selectedTheater,
      },
    });
  };

  return (
    <TimeWrapper>
      <TimeTitle>시간</TimeTitle>
      {timeData?.map(time => (
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
  );
};

export default AllTimeList;

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
