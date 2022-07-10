import React from 'react';
import styled from 'styled-components';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import MovieInfo from './MovieInfo';
import MovieRealComment from './MovieRealComment';
import MovieVideo from './MovieVideo';
import MoviePostModal from './MoviePostModal';

export default function BottomDetail({ setData, movieData, setDep }) {
  return (
    <STabs
      selectedTabClassName="is-selected"
      selectedTabPanelClassName="is-selected"
    >
      <STabList>
        <STab>주요정보</STab>
        <STab>실관람평</STab>
        <STab>무비포스트</STab>
        <STab>예고편</STab>
      </STabList>
      <STabPanel>
        <MovieInfo movieInfo={movieData.description} />
      </STabPanel>
      <STabPanel>
        <MovieRealComment
          setDep={setDep}
          setData={setData}
          movieComments={movieData.reviews}
          movieTitle={movieData.name}
          movieCount={movieData.reviews_count}
        />
      </STabPanel>
      <STabPanel>
        <MoviePostModal
          moviePosts={movieData.movieposts}
          movieCount={movieData.movieposts_count}
        />
      </STabPanel>
      <STabPanel>
        <MovieVideo moviePreview={movieData.preview_url} />
      </STabPanel>
    </STabs>
  );
}

const STabs = styled(Tabs)`
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 20px;
`;

const STabList = styled(TabList)`
  margin-bottom: 3px;
  margin-left: 4px;
  display: flex;
`;
const STab = styled(Tab)`
  border: 1px dotted lightgray;
  align-items: center;
  justify-content: center;
  user-select: none;
  display: flex;
  width: 550px;
  height: 50px;
  border-bottom: 1px solid green;

  &.is-selected {
    color: green;
    border-bottom: none;
    border-top: 1px solid green;
    border-left: 1px solid green;
    border-right: 1px solid green;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0);
    border-bottom: none;
  }
`;

const STabPanel = styled(TabPanel)`
  display: none;
  height: 100%;
  padding: 4px;
  margin-top: -3px;
  margin-left: 4px;
  border-top: none;
  margin-bottom: 20px;

  &.is-selected {
    display: block;
    min-height: min-content;
    max-height: max-content;
  }
`;
