import React from 'react';
import styled from 'styled-components';

function BookedList() {
  return (
    <ListBox>
      <BookTitle>예약 내역</BookTitle>
      <BookedItem />
    </ListBox>
  );
}

export default BookedList;

const ListBox = styled.div`
  width: 100%;
`;

const BookTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 15px;
  border-bottom: 1px solid;
`;

const BookedItem = styled.div``;
