import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SeatButton from './SeatButton';

function Seat() {
  const [numAdult, setNumAdult] = useState(0);
  const [numTeenager, setNumTeenager] = useState(0);
  const [numKid, setNumKid] = useState(0);
  const [isClicked, setisClicked] = useState(false);
  const [seatData, setSeatData] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedUser, setSelectedUser] = useState([0]);
  const [priceInfo, setPriceInfo] = useState([0]);
  const [userType, setUserType] = useState([]);
  const totalNumber = numTeenager + numAdult + numKid;
  const navigate = useNavigate();
  const location = useLocation();
  const { movie_theater_id } = location.state;

  useEffect(() => {
    fetch(
      `http://10.58.0.92:8000/Reserve/seatlist?movietheater_id=${movie_theater_id}`
    )
      .then(res => res.json())
      .then(data => {
        setSeatData(data.seats_list);
        setRows(data.seats_list.seats);
      });
  }, [movie_theater_id]);

  useEffect(() => {
    fetch('http://10.58.0.92:8000/Reserve/price')
      .then(res => res.json())
      .then(data => setUserType(data.price_list));
  }, []);

  const plusHandlerAdult = () => {
    if (totalNumber < rows.length) {
      setNumAdult(prev => prev + 1);
      setSelectedUser(prev => [...prev, 'ADULT']);
      setPriceInfo(prev => [...prev, userType[0].ADULT]);
    }
  };

  const plusHandlerTeenager = () => {
    if (totalNumber < rows.length) {
      setNumTeenager(prev => prev + 1);
      setSelectedUser(prev => [...prev, 'TEENAGER']);
      setPriceInfo(prev => [...prev, userType[1].TEENAGER]);
    }
  };

  const plusHandlerKid = () => {
    if (totalNumber < rows.length) {
      setNumKid(prev => prev + 1);
      setSelectedUser(prev => [...prev, 'KID']);
      setPriceInfo(prev => [...prev, userType[2].KID]);
    }
  };

  const minusHandlerAdult = () => {
    if (numAdult) {
      setNumAdult(prev => prev - 1);
    }
  };
  const minusHandlerTeenager = () => {
    if (numTeenager) {
      setNumTeenager(prev => prev - 1);
    }
  };

  const minusHandlerKid = () => {
    if (numKid) {
      setNumKid(prev => prev - 1);
    }
  };

  const showSeats = () => {
    if (totalNumber) {
      setisClicked(prev => !prev);
    } else {
      alert('인원수 최소 1명을 고르셔야 합니다.');
    }
  };

  const addSeats = row => {
    if (totalNumber > selectedRows.length) {
      setSelectedRows(prev => [...prev, row]);
      setSelected(prev => [
        ...prev,
        {
          user_id: localStorage.getItem('token'),
          movie_theater_id,
          type: selectedUser[0],
          price: priceInfo[0],
          seat_id: row.id,
        },
      ]);
      const copyUser = selectedUser;
      const copyPrice = priceInfo;
      copyUser.shift();
      copyPrice.shift();
      setSelectedUser(copyUser);
      setPriceInfo(copyPrice);
    }
  };

  const removeSeats = seat => {
    setSelectedRows(prev => prev.filter(row => row.id !== seat));
  };

  const submitReservation = () => {
    if (totalNumber === selectedRows.length) {
      fetch('http://10.58.0.92:8000/Reserve', {
        method: 'POST',
        headers: { Authorization: localStorage.getItem('token') },
        body: JSON.stringify(selected),
      }).then(res => {
        if (res.status === 201) {
          alert('예매가 완료되었습니다.');
          navigate('/');
        }
      });
    } else {
      alert('고른 인원 수에 맞게 자리를 골라주세요');
    }
  };

  return (
    <SeatWrapper>
      <SelectCustomer isClicked={isClicked}>
        {isClicked ? (
          <MiniFinder>
            <ShowPeople>
              성인: {numAdult}명 &nbsp;&nbsp; 청소년: {numTeenager}명
              &nbsp;&nbsp; 유아: {numKid}명
            </ShowPeople>
            <ShowPrice>
              합계: &nbsp;
              {(
                numAdult * userType[0].ADULT +
                numTeenager * userType[1].TEENAGER +
                numKid * userType[2].KID
              ).toLocaleString()}
              원
            </ShowPrice>
            <BackButton onClick={showSeats}>인원선택으로 돌아가기</BackButton>
          </MiniFinder>
        ) : (
          <>
            <SeatChoice>
              <div>성인</div>
              <ButtonContainer>
                <MinusButton onClick={minusHandlerAdult}>-</MinusButton>
                <Counting>{numAdult}</Counting>
                <PlusButton onClick={plusHandlerAdult}>+</PlusButton>
              </ButtonContainer>
            </SeatChoice>
            <SeatChoice>
              <div>청소년</div>
              <ButtonContainer>
                <MinusButton onClick={minusHandlerTeenager}>-</MinusButton>
                <Counting>{numTeenager}</Counting>
                <PlusButton onClick={plusHandlerTeenager}>+</PlusButton>
              </ButtonContainer>
            </SeatChoice>
            <SeatChoice>
              <div>유아</div>
              <ButtonContainer>
                <MinusButton onClick={minusHandlerKid}>-</MinusButton>
                <Counting>{numKid}</Counting>
                <PlusButton onClick={plusHandlerKid}>+</PlusButton>
              </ButtonContainer>
            </SeatChoice>
            <SelectionFinish onClick={showSeats}>좌석고르기</SelectionFinish>
          </>
        )}
      </SelectCustomer>
      {isClicked && (
        <SeatPickerandPrice>
          <SeatPicking>
            <h1>좌석 안내도 ({seatData.room_name})</h1>
            <SeatRow>
              {rows.map(row => {
                return (
                  <SeatButton
                    key={row.id}
                    row={row}
                    numTeenager={numTeenager}
                    numAdult={numAdult}
                    numKid={numKid}
                    selectedRows={selectedRows}
                    addSeats={addSeats}
                    removeSeats={removeSeats}
                    totalNumber={totalNumber}
                  />
                );
              })}
            </SeatRow>
          </SeatPicking>
          <Aside>
            <div>고른좌석</div>
            <SubmitButton onClick={submitReservation}>예매하기</SubmitButton>
            <SeatViewer selectedRows={selectedRows}>
              {selectedRows.map(ticket => {
                return (
                  <SeatElement key={ticket.id}>{ticket.location}</SeatElement>
                );
              })}
            </SeatViewer>
          </Aside>
        </SeatPickerandPrice>
      )}
    </SeatWrapper>
  );
}

export default Seat;

const SeatWrapper = styled.div`
  display: flex;
  height: 500px;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const SelectCustomer = styled.div`
  display: flex;
  position: ${props => (props.isClicked ? 'absolute' : 'relative')};
  justify-content: space-between;
  width: 700px;
  padding-bottom: 20px;
  background-color: white;
  border-bottom: 1px solid gray;
`;

const SeatChoice = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const MinusButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: ${props => props.theme.lightgreen};
  color: whitesmoke;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
  }
`;

const Counting = styled.div`
  width: 100px;
  height: 30px;
  text-align: center;
  padding: 10px;
  font-size: larger;
`;

const PlusButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: ${props => props.theme.lightgreen};
  color: whitesmoke;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
  }
`;

const MiniFinder = styled.div`
  width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ShowPeople = styled.div`
  width: 300px;
`;

const ShowPrice = styled.div`
  width: 120px;
`;

const SelectionFinish = styled.button`
  width: 70px;
  height: 30px;
  position: absolute;
  bottom: 0;
  left: 320px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.lightgreen};
    color: white;
    font-weight: bold;
    opacity: 0.4;
  }
`;

const BackButton = styled.button`
  width: 160px;
  height: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.lightgreen};
    color: white;
    font-weight: bold;
    opacity: 0.4;
  }
`;

const SeatPickerandPrice = styled.div`
  display: flex;
  transition: all 0.5s;
  margin-top: 50px;
  height: 400px;
`;

const SeatPicking = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  width: 500px;
  height: 400px;

  h1 {
    font-weight: bold;
    font-size: 25px;
  }
`;

const SeatRow = styled.div`
  width: 450px;
`;

const Aside = styled.div`
  width: 200px;
  height: 350px;
  padding-top: 35px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  overflow: scroll;
`;

const SeatViewer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  padding-left: 30px;
  margin-top: 10px;
  border: ${props =>
    props.selectedRows.length ? '1px solid lightgrey' : 'none'};
`;

const SeatElement = styled.div`
  width: 50px;
  height: 50px;
  margin-top: 20px;
  margin-left: 10px;
  padding-top: 18px;
  background-color: lightblue;
  color: white;
  border-radius: 50%;
  text-align: center;
  font-size: 15px;
`;

const SubmitButton = styled.button`
  width: 80px;
  height: 30px;
  margin-top: 30px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.lightgreen};
    color: white;
    font-weight: bold;
    opacity: 0.4;
  }
`;
