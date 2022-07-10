import React, { useState } from 'react';
import styled from 'styled-components';

function SeatButton({ row, selectedRows, addSeats, removeSeats, totalNumber }) {
  const [isChecked, setIschecked] = useState(true);

  const checkedSeat = () => {
    if (totalNumber > selectedRows.length && isChecked) {
      setIschecked(prev => !prev);
    } else if (!isChecked) {
      setIschecked(prev => !prev);
    }
  };
  return (
    <SeatNumber
      seatnum={row.id}
      is_reserved={row.is_reserved}
      isChecked={isChecked}
      disabled={row.is_reserved}
      onClick={() => {
        checkedSeat();
        isChecked ? addSeats(row) : removeSeats(row.id);
      }}
    >
      {row.location}
    </SeatNumber>
  );
}

export default SeatButton;

const SeatNumber = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
  margin-right: ${props => (props.seatnum % 10 === 5 ? '40px' : '1px')};
  color: white;
  background-color: ${props =>
    props.is_reserved
      ? 'grey'
      : props.isChecked
      ? 'lightblue'
      : props.theme.terra};
  border: none;
  cursor: ${props => (props.is_reserved ? 'default' : 'pointer')};
`;
