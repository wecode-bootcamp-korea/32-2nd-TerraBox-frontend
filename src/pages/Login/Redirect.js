import React from 'react';
import { useNavigate } from 'react-router-dom';

function Redirect() {
  const code = new URL(window.location.href).searchParams.get('code');
  const goToMain = useNavigate();

  fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${code}`,
  })
    .then(res => res.json())
    .then(kakaoData => {
      if (kakaoData.access_token) {
        fetch('http://10.58.6.129:8000/users/login', {
          method: 'POST',
          headers: {
            Authorization: kakaoData.access_token,
          },
        })
          .then(data => data.json())
          .then(addData => {
            if ((addData.message = 'success')) {
              localStorage.setItem('token', addData.JWT_ACCESS_TOKEN);
              localStorage.setItem('nickname', addData.nickname);
              localStorage.setItem('profileIcon', addData.profile_image_url);
            }
            //닉네임, 토큰값
          });
        alert('TERRA BOX에 오신 걸 환영합니다 :)');
        goToMain('/');
        window.location.reload();
      }
    });

  return <div>로그인 완료 !</div>;
}

export default Redirect;
