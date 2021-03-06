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
      `http://15.164.163.31:8000/Reserve/seatlist?movietheater_id=${movie_theater_id}`
    )
      .then(res => res.json())
      .then(data => {
        setSeatData(data.seats_list);
        setRows(data.seats_list.seats);
      });
  }, [movie_theater_id]);

  useEffect(() => {
    fetch('http://15.164.163.31:8000/Reserve/price')
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
      alert('????????? ?????? 1?????? ???????????? ?????????.');
    }
  };

  const addSeats = row => {
    if (totalNumber > selectedRows.length) {
      setSelectedRows(prev => [...prev, row]);
      setSelected(prev => [
        ...prev,
        {
          user_id: localStorage.getItem('token'),
          // movie_theater_id,
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
      fetch('http://15.164.163.31:8000/Reserve', {
        method: 'POST',
        headers: { Authorization: localStorage.getItem('token') },
        body: JSON.stringify(selected),
      }).then(res => {
        if (res.status === 201) {
          alert('????????? ?????????????????????.');
          navigate('/');
        }
      });
    } else {
      alert('?????? ?????? ?????? ?????? ????????? ???????????????');
    }
  };

  return (
    <SeatWrapper>
      <SelectCustomer isClicked={isClicked}>
        {isClicked ? (
          <MiniFinder>
            <ShowPeople>
              ??????: {numAdult}??? &nbsp;&nbsp; ?????????: {numTeenager}???
              &nbsp;&nbsp; ??????: {numKid}???
            </ShowPeople>
            <ShowPrice>
              ??????: &nbsp;
              {(
                numAdult * userType[0].ADULT +
                numTeenager * userType[1].TEENAGER +
                numKid * userType[2].KID
              ).toLocaleString()}
              ???
            </ShowPrice>
            <BackButton onClick={showSeats}>?????????????????? ????????????</BackButton>
          </MiniFinder>
        ) : (
          <>
            <SeatChoice>
              <div>??????</div>
              <ButtonContainer>
                <MinusButton onClick={minusHandlerAdult}>-</MinusButton>
                <Counting>{numAdult}</Counting>
                <PlusButton onClick={plusHandlerAdult}>+</PlusButton>
              </ButtonContainer>
            </SeatChoice>
            <SeatChoice>
              <div>?????????</div>
              <ButtonContainer>
                <MinusButton onClick={minusHandlerTeenager}>-</MinusButton>
                <Counting>{numTeenager}</Counting>
                <PlusButton onClick={plusHandlerTeenager}>+</PlusButton>
              </ButtonContainer>
            </SeatChoice>
            <SeatChoice>
              <div>??????</div>
              <ButtonContainer>
                <MinusButton onClick={minusHandlerKid}>-</MinusButton>
                <Counting>{numKid}</Counting>
                <PlusButton onClick={plusHandlerKid}>+</PlusButton>
              </ButtonContainer>
            </SeatChoice>
            <SelectionFinish onClick={showSeats}>???????????????</SelectionFinish>
          </>
        )}
      </SelectCustomer>
      {isClicked && (
        <SeatPickerandPrice>
          <SeatPicking>
            <h1>?????? ????????? ({seatData.room_name})</h1>
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
            <div>????????????</div>
            <SubmitButton onClick={submitReservation}>????????????</SubmitButton>
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
