import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import FooterMap from './FooterMap';

function Footer() {
  const [isMapShow, setIsMapShow] = useState(false);
  const handleClick = () => {
    setIsMapShow(!isMapShow);
  };

  const location = useLocation();
  const detectLocation = location.pathname === '/';

  return (
    <>
      {isMapShow && (
        <MapWrapper>
          <FooterMap />
          <Closebutton onClick={handleClick}>X</Closebutton>
        </MapWrapper>
      )}
      <FooterAll detectLocation={detectLocation}>
        <FooterWrapper>
          <FooterInfo>
            <span>회사소개</span>
            <span>인재채용</span>
            <span>사회공헌</span>
            <span>제휴/광고/부대사업문의</span>
            <span>이용약관</span>
            <span>위치기반서비스 이용약관</span>
            <span>개인정보처리방침</span>
            <span>윤리경영</span>
          </FooterInfo>
          <FooterSearch>
            <a>
              <i class="fa-solid fa-magnifying-glass" onClick={handleClick}>
                극장찾기
              </i>
            </a>
          </FooterSearch>
        </FooterWrapper>
        <FooterContainer>
          <Link to="/">
            <img
              alt="TerraBoxLogo"
              src={
                detectLocation
                  ? '/images/TerraBoxLogoNewBlack.png'
                  : '/images/TerraBoxLogoNewWhite.png'
              }
            />
          </Link>
          <FooterDesc>
            <span>
              서울특별시 강남구 테헤란로 427 위워크타워 10층(삼성동 143-40) ARS
              1577-1577
            </span>
            <span>
              대표자 박준범 ・ 개인정보보호책임자 제정욱 사업자등록번호
              211-86-59478 ・ 통신판매업신고번호 제 2020-서울마포-4545 호
            </span>
            <span>COPYRIGHT © MegaboxJoongAng, Inc. All rights reserved</span>
          </FooterDesc>
          <FooterIcons>
            <i class="fa-brands fa-youtube" />
            <i class="fa-brands fa-instagram-square" />
            <i class="fa-brands fa-facebook" />
            <i class="fa-brands fa-twitter" />
          </FooterIcons>
        </FooterContainer>
      </FooterAll>
    </>
  );
}

export default Footer;

const FooterAll = styled.div`
  // margin: 60px 0px;
  height: 280px;
  color: ${props => (props.detectLocation ? 'white' : 'rgb(25, 16, 15)')};
  background-color: ${props =>
    props.detectLocation ? 'rgb(25, 16, 15)' : 'white'};
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 80px;
  padding-bottom: 20px;
  margin: 0px 45px;
`;

const FooterInfo = styled.div`
  span {
    padding: 0px 7px;
    font-size: 14px;
    cursor: pointer;
  }
`;

const FooterSearch = styled.div`
  margin-right: 40px;
  padding: 7px 15px;
  border: 1px solid black;
  border-radius: 20px;
  font-size: 13px;
  color: ${props => (props.detectLocation ? 'white' : 'black')};
  // #666666;
  background-color: ${props => (props.detectLocation ? 'black' : 'white')};
  cursor: pointer;
`;

const FooterContainer = styled.div`
  display: flex;
  margin: 10px 15px;

  img {
    width: 200px;
  }
`;

const FooterDesc = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  span {
    margin: 3px 0px;
  }
`;

const FooterIcons = styled.div`
  margin-left: 300px;

  i {
    padding: 0px 5px;
    font-size: 30px;
    border-radius: 70%;
    color: ${props => (props.detectLocation ? 'white' : 'white')} 
    cursor: pointer;
  }
`;

const MapWrapper = styled.div`
  display: flex;
  position: relative;
`;

const Closebutton = styled.button`
  position: absolute;
  top: 1px;
  right: 1px;
  z-index: 3;
  width: 30px;
  height: 30px;
  border-radius: 20%;
  background-color: ${props => props.theme.terra};
  color: whitesmoke;
  border: none;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
`;
