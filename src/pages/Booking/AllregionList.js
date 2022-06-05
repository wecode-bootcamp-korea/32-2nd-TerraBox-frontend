import React from 'react';
import styled from 'styled-components';

const AllregionList = ({
  regionTheaters,
  selectedTheater,
  setSelectedTheater,
}) => {
  const selectTheater = id => {
    const selectedObject = regionTheaters.find(
      ({ theater_id }) => theater_id === id
    );
    setSelectedTheater(selectedObject.theater_id);
  };

  return (
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
  );
};

export default AllregionList;

const RegionTheatersListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RegionItem = styled.div`
  display: flex;
  padding-bottom: 7px;
  background-color: ${props =>
    props.regionId === props.regionTheatersId ? 'gray' : 'white'};
  > div {
    padding: 6px 70px 5px 10px;
    font-size: 13px;
    color: ${props =>
      props.regionId === props.regionTheatersId ? 'white' : 'black'};
  }
`;
