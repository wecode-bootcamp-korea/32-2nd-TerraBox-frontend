import React, { useEffect } from 'react';

const { kakao } = window;

function FooterMap() {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.532108, 127.02934),
      level: 8,
    };
    const map = new kakao.maps.Map(container, options);

    const positions = [
      {
        title: '메가박스 코엑스',
        content: '<div>메가박스 코엑스</div>',
        latlng: new kakao.maps.LatLng(37.512928, 127.058827),
      },
      {
        title: '메가박스 강남',
        latlng: new kakao.maps.LatLng(39.498409, 127.026222),
      },
      {
        title: '메가박스 강남대로',
        latlng: new kakao.maps.LatLng(37.500391, 127.027006),
      },
      {
        title: '메가박스 센트럴',
        latlng: new kakao.maps.LatLng(37.504756, 127.004184),
      },
      {
        title: '메가박스 성수',
        latlng: new kakao.maps.LatLng(37.541735, 127.045094),
      },
    ];

    positions.map(position => {
      const imageSrc =
          'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
        imageSize = new kakao.maps.Size(45, 45),
        imageOption = { offset: new kakao.maps.Point(27, 69) };

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      const marker = new kakao.maps.Marker({
        map: map,
        position: position.latlng,
        title: position.title,
        image: markerImage,
      });

      marker.setMap(map);
    });
  }, []);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '300px',
      }}
    >
      FooterMap
    </div>
  );
}

export default FooterMap;
