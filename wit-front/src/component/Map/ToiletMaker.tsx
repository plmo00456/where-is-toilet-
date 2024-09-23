import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import markerToiletImg from "../../assets/img/marker_toilet.png";

interface ToiletMarkerProps {
  position: {
    lat: number;
    lng: number;
  };
  index: number;
  title?: string;
  onClick?: (marker: kakao.maps.Marker) => void;
  isClicked?: boolean;
}

export default function ToiletMarker({
  position,
  index,
  title,
  onClick,
  isClicked,
}: ToiletMarkerProps) {
  const MARKER_WIDTH = 48;
  const MARKER_HEIGHT = 52;
  const CLICKED_MARKER_WIDTH = 62; // 클릭 시 커진 마커 너비
  const CLICKED_MARKER_HEIGHT = 66; // 클릭 시 커진 마커 높이
  const OFFSET_X = MARKER_WIDTH / 2; // 마커의 중앙을 기준점으로 설정
  const OFFSET_Y = MARKER_HEIGHT; // 마커 하단을 기준점으로 설정
  const CLICKED_OFFSET_X = OFFSET_X + 5;
  const CLICKED_OFFSET_Y = OFFSET_Y + 14;
  const SPRITE_MARKER_URL = markerToiletImg;

  return (
    <>
      <MapMarker
        position={position} // 마커를 표시할 위치
        onClick={onClick}
        image={{
          src: SPRITE_MARKER_URL, // 마커 이미지 URL
          size: isClicked
            ? { width: CLICKED_MARKER_WIDTH, height: CLICKED_MARKER_HEIGHT }
            : { width: MARKER_WIDTH, height: MARKER_HEIGHT }, // 마커의 크기 (클릭 시 커짐)
          options: {
            offset: {
              x: isClicked ? CLICKED_OFFSET_X : OFFSET_X,
              y: isClicked ? CLICKED_OFFSET_Y : OFFSET_Y,
            },
          },
        }}
      />
      {/* 마커 클릭 시 인포윈도우 표시 */}
      {isClicked && title && (
        <CustomOverlayMap position={position} yAnchor={4}>
          <div className={`flex justify-center items-center px-5 text-gray-800 bg-white rounded-lg border border-gray-700 shadow-lg`}>
            {title || "Toilet Information"}
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
}
