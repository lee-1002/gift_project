import React, { useEffect, useRef, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";

const YOUR_APP_KEY = "b9fa422afee281c2c1977dbedb2cbf9b";

export default function MapPage() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLoc, setUserLoc] = useState(null);
  const markersRef = useRef([]);
  const pulseOverlayRef = useRef(null);
  const [keyword, setKeyword] = useState("맛집");
  const [loading, setLoading] = useState(false);

  // 기존 마커 전부 제거
  const clearMarkers = () => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  };

  // 반경 2km 내 키워드 검색
  const searchNearby = (loc, query = keyword) => {
    if (!map || !loc || !query.trim()) return;
    setLoading(true);
    clearMarkers();

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(
      query,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          data.forEach((place) => {
            const pos = new window.kakao.maps.LatLng(place.y, place.x);
            const marker = new window.kakao.maps.Marker({ map, position: pos });
            markersRef.current.push(marker);

            new window.kakao.maps.InfoWindow({
              content: `<div style="padding:4px;">${place.place_name}</div>`,
            }).open(map, marker);

            bounds.extend(pos);
          });
          map.setBounds(bounds);
        } else {
          // 검색 결과 없으면 최소 내 위치 중심으로
          map.setCenter(loc);
          map.setLevel(4);
        }
        setLoading(false);
      },
      { location: loc, radius: 2000, page: 1 }
    );
  };

  useEffect(() => {
    // pulse-dot 스타일
    if (!document.getElementById("pulse-dot-style")) {
      const style = document.createElement("style");
      style.id = "pulse-dot-style";
      style.innerHTML = `
        .pulse-dot { width:12px; height:12px; background:#ff3b30; border-radius:50%; position:relative; }
        .pulse-dot::after {
          content:''; position:absolute; top:0; left:0;
          width:12px; height:12px; border-radius:50%;
          border:2px solid rgba(255,59,48,0.7);
          animation:pulse 3s ease-out infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity:1 }
          100% { transform: scale(3); opacity:0 }
        }
      `;
      document.head.appendChild(style);
    }

    // 지도 초기화
    function initMap() {
      if (!mapRef.current) return;
      const kakaoMap = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 4,
        scrollwheel: true,
      });
      setMap(kakaoMap);

      // 내 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const loc = new window.kakao.maps.LatLng(
              coords.latitude,
              coords.longitude
            );
            setUserLoc(loc);
            kakaoMap.setCenter(loc);
            kakaoMap.setLevel(4);

            // 펄스 오버레이 갱신
            pulseOverlayRef.current?.setMap(null);
            const overlay = new window.kakao.maps.CustomOverlay({
              position: loc,
              content: `<div class="pulse-dot"></div>`,
              yAnchor: 0.5,
            });
            overlay.setMap(kakaoMap);
            pulseOverlayRef.current = overlay;

            // 초기 자동 검색
            searchNearby(loc, keyword);
          },
          () => console.warn("위치 정보를 가져올 수 없습니다.")
        );
      }
    }

    // SDK 로드 & init
    const loadAndInit = () => window.kakao.maps.load(initMap);
    if (window.kakao && window.kakao.maps) {
      loadAndInit();
    } else {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${YOUR_APP_KEY}&libraries=services`;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = loadAndInit;
      script.onerror = () => console.error("카카오 지도 SDK 로드 실패");
      document.head.appendChild(script);
      return () => document.head.removeChild(script);
    }
  }, []); // 한 번만

  // 내 위치 버튼
  const handleRecenter = () => {
    if (userLoc && map) {
      map.setCenter(userLoc);
      map.setLevel(4);
      searchNearby(userLoc, keyword);
    }
  };

  return (
    <BasicLayout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">
          내 주변(2km) 가맹점 검색
        </h1>
        <div className="flex space-x-2 mb-4">
          <input
            className="border p-2 flex-1"
            type="text"
            placeholder="브랜드명 입력 (예: 스타벅스)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={() => searchNearby(userLoc)}
            disabled={loading}
          >
            {loading ? "검색 중..." : "검색"}
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleRecenter}
          >
            내 위치
          </button>
        </div>
        <div ref={mapRef} className="w-full h-[600px] border rounded" />
      </div>
    </BasicLayout>
  );
}
