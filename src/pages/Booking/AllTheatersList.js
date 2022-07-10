import React from 'react';
import styled from 'styled-components';
import AllregionList from './AllregionList';

const AllTheatersList = ({
  theatersData,
  selectedRegion,
  setRegionTheaters,
  setSelectedRegion,
  regionTheaters,
  selectedTheater,
  setSelectedTheater,
}) => {
  const selectRegion = id => {
    const selectedObject = theatersData.find(
      ({ region_id }) => region_id === id
    );
    setRegionTheaters(selectedObject.theaters);
    setSelectedRegion(selectedObject.region_id);
  };

  return (
    <TheatersWrapper>
      <TheatersTitle>극장</TheatersTitle>
      <TheatersSelector>
        <TheatersSelectorText>전체</TheatersSelectorText>
      </TheatersSelector>
      <TheatersRegionWrapper>
        <TheatersListWrapper>
          {theatersData &&
            theatersData.map(theatersData => {
              return (
                <TheatersList
                  key={theatersData.region_id}
                  theater={theatersData.region_id}
                  selectedRegion={selectedRegion}
                >
                  <div onClick={() => selectRegion(theatersData.region_id)}>
                    {theatersData.region_name}({theatersData.theaters.length})
                  </div>
                </TheatersList>
              );
            })}
        </TheatersListWrapper>
        <AllregionList
          regionTheaters={regionTheaters}
          selectedTheater={selectedTheater}
          setSelectedTheater={setSelectedTheater}
        />
      </TheatersRegionWrapper>
    </TheatersWrapper>
  );
};

export default AllTheatersList;

const TheatersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  border-right: 1px solid #d8d9db;
`;
const TheatersTitle = styled.div`
  color: #222;
  font-size: 20px;
  line-height: 38px;
  padding: 20px 0 0 20px;
`;

const TheatersSelector = styled.div`
  padding: 18px;
  > div {
    border: 1px solid #d8d9db;
    border-bottom: none;
    height: 35px;
    font-size: 16px;
    text-align: center;
    margin-top: 10;
    padding-top: 6px;
  }
`;

const TheatersListWrapper = styled.div`
  padding-left: 20px;
`;

const TheatersRegionWrapper = styled.div`
  display: flex;
`;

const TheatersList = styled.div`
  display: flex;
  padding-bottom: 7px;

  background-color: ${props =>
    props.theater === props.selectedRegion ? 'gainsboro' : 'white'};

  > div {
    padding: 6px 0px 5px 10px;
    font-size: 13px;
  }
`;

// const RegionTheatersListWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const RegionItem = styled.div`
//   display: flex;
//   padding-bottom: 7px;
//   background-color: ${props =>
//     props.regionId === props.regionTheatersId ? 'gray' : 'white'};
//   > div {
//     padding: 6px 70px 5px 10px;
//     font-size: 13px;
//     color: ${props =>
//       props.regionId === props.regionTheatersId ? 'white' : 'black'};
//   }
// `;

const TheatersSelectorText = styled.div`
  border: 1px solid #d8d9db;
  border-bottom: none;
  height: 35px;
  font-size: 16px;
  text-align: center;
  margin-top: 10;
  padding-top: 6px;
`;
