import React, { useState, useCallback, memo, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];

// 맵 크기
const containerStyle = {
  width: "100%",
  height: "100vh",
};

// 초기 중심 좌표 설정
const center = {
  lat: 37.5665, // 한국의 위도
  lng: 126.978, // 한국의 경도
};

// 마커 위치 지정
const markerPosition = {
  lat: 37.5665,
  lng: 126.978,
};

// 클러스터러 위한 마커 배열
const markersArray = [
  {
    id: 1,
    lat: 37.5665,
    lng: 126.978,
    label: "서울 시청",
    content: "서울의 중심지",
  },
  {
    id: 2,
    lat: 37.564,
    lng: 126.975,
    label: "광화문",
    content: "역사적인 장소",
  },
  { id: 3, lat: 37.565, lng: 126.978, label: "명동", content: "쇼핑의 중심" },
];

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(null);

  // 해수욕장 이름으로 경위도 검색
  useEffect(() => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      const beachName = "갈음이 해수욕장"; // 검색하려는 해수욕장 이름

      geocoder.geocode({ address: beachName }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          const latLng = results[0].geometry.location;
          setLocation({ lat: latLng.lat(), lng: latLng.lng() });
        }
      });
    }
  }, [isLoaded]);

  // 지도가 성공적으로 로드 되었다면
  const onLoad = useCallback((map) => {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  // 언마운트 될 때  setMap(null)을 호출함으로써 현재 지도 객체의 참조를 해제하여 메모리 누수를 방지하고, 지도 관련 리소스를 정리한다
  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* 단일 마커 생성하고 위치를 지정합니다 */}
      <Marker position={markerPosition} />

      {/* 마커 클러스터러 지정: zoomout 상태에서 여러개의 마커를 데이터 뭉치로 보여주기 */}
      <MarkerClusterer gridSize={60}>
        {(clusterer) =>
          markersArray.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              clusterer={clusterer}
              onClick={() => handleMarkerClick(marker)}
            />
          ))
        }
      </MarkerClusterer>

      {/* 마커 클릭 시 info 윈도우 */}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>{selectedMarker.content}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <>맵 로드 실패</>
  );
};

export default memo(Map);
