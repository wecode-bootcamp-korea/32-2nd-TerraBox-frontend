import React from 'react';
import styled from 'styled-components';

function BookedList() {
  return (
    <ListBox>
      <BookTitle>예약 내역</BookTitle>
      예약내역이 없습니ㅏㄷ
      <BookedItem />
    </ListBox>
  );
}

export default BookedList;

const ListBox = styled.div`
  width: 100%;
  margin-bottom: 150px;
`;

const BookTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 15px;
  border-bottom: 1px solid;
`;

const BookedItem = styled.div``;
