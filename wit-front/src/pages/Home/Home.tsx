import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { MdOutlineMyLocation } from "react-icons/md";
import { GrRefresh } from "react-icons/gr";
import { TbMenu2 } from "react-icons/tb";
import Loading from "../../component/Utils/Loading";
import ToiletMaker from "../../component/Map/ToiletMaker";
import DraggableBottomLayer from "../../component/BottomLayer";
import markerMyImg from "../../assets/img/marker_my.png";

export default function Home() {

  // 테스트용 삭제해야함
  const testMarkers = [
    {
      title: "쌍암공원 화장실 1",
      latlng: { lat: 35.222240962971966, lng: 126.844185070463 },
    },
    {
      title: "쌍암공원 화장실 2",
      latlng: { lat: 35.224108054535336, lng: 126.84519755313516 },
    },
    {
      title: "다담 마트 화장실",
      latlng: { lat: 35.2193934367396, lng: 126.8483148944007 },
    },
    {
      title: "첨단종합병원 화장실",
      latlng: { lat: 35.221079665476935, lng: 126.8453103972226 },
    },
  ]




  


  interface LatLng {
    lat?: number | null;
    lng?: number | null;
    msg?: string | null;
  }

  const [clickedMarkerIndex, setClickedMarkerIndex] = useState(null as number | null);

  const [currentLocation, setCurrentLocation] = useState({
    lat: null as number | null,
    lng: null as number | null,
  });
  const [loading, setLoading] = useState(false);
  const [isMoveMap, setIsMoveMap] = useState(false);
  const [state, setState] = useState({
    center: {
      lat: 37.571625 as number,
      lng: 127.0421417 as number,
    },
    errMsg: null as string | null,
    isLoading: true as boolean,
    isPanto: true as boolean,
  });

  function setCenter(position: LatLng) {
    const { lat, lng } = position;
    if (lat && lng) {
      console.log(lat + ".  " + lng);
      setState((prev) => ({
        ...prev,
        center: {
          lat: lat,
          lng: lng,
        },
        isLoading: false,
      }));
    }
  }

  function getCurrentPosition(): Promise<LatLng> {
    return new Promise((resolve) => {
      if (currentLocation.lat === null || currentLocation.lng === null) {
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({
                lat: latitude,
                lng: longitude,
              });
              resolve({
                lat: latitude,
                lng: longitude,
                msg: "success",
              });
            },
            (err) => {
              setState((prev) => ({
                ...prev,
                errMsg: err.message,
                isLoading: false,
              }));
              resolve({
                msg: "error",
              });
            }
          );
        } else {
          // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
          setState((prev) => ({
            ...prev,
            errMsg: "geolocation을 사용할수 없어요..",
            isLoading: false,
          }));
          resolve({
            msg: "error",
          });
        }
      }
    });
  }

  function getData() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  useEffect(() => {
    getCurrentPosition().then((position: LatLng) => {
      if (position.lat && position.lng) {
        setCenter(position);
      }
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      {loading && <Loading />}
      <div className="flex w-full h-full">
        <Map
          center={state.center}
          isPanto={state.isPanto}
          style={{ width: "100%", height: "100%" }}
          level={3}
          onClick={(_, mouseEvent) => {
            setClickedMarkerIndex(null);
            const latlng = mouseEvent.latLng
            console.log(
              `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`,
            )
          }}
          onDragEnd={(map) => {
            setIsMoveMap(true);
            const latlng = map.getCenter();
            setState((prev) => ({
              ...prev,
              center: {
                lat: latlng.getLat(),
                lng: latlng.getLng(),
              },
            }));
          }}
        >
          {!state.isLoading && currentLocation.lat && currentLocation.lng && (
            <MapMarker
              position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
              image={{
                src: markerMyImg,
                size: {
                  width: 32,
                  height: 32,
                }
              }}
            />
          )}


          {/* 나중에 삭제해야함 */}
          {testMarkers.map((marker, index) => (
            <ToiletMaker
              key={`${marker.title}-${marker.latlng}`}
              position={marker.latlng}
              index={index}
              title={marker.title}
              isClicked={clickedMarkerIndex === index}
              onClick={(d) => {
                setClickedMarkerIndex(clickedMarkerIndex === index ? null : index);
              }}
            />
          ))}
          
        </Map>
      </div>

      <div className="absolute flex-col items-center justify-center top-5 w-[90vw] md:w-[50vw] z-10">
        <div className="flex justify-center items-center">
          <button className="bg-white flex justify-center items-center w-[4rem] h-[3.4rem] text-3xl mr-3 rounded-lg px-3 border border-gray-300 text-gray-500">
            <TbMenu2 />
          </button>
          <form className="w-[100%]">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 items-center pointer-events-none start-0 ps-3">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 ps-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="장소, 주소 검색"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                검색
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 하단 2 레이어 */}
      <DraggableBottomLayer/>
      {/* <div className="flex flex-col absolute bottom-0 z-30 justify-center items-center w-full h-[88%] bg-white shadow-[rgba(0,0,15,0.5)_0px_-5px_30px_-10px]">
        <div className="flex absolute top-0 justify-center items-center w-full h-5 select-none group">
          <div className="bg-gray-300 group-active:bg-gray-400 rounded-lg h-1 w-[3rem]"></div>
        </div>
        <div>b</div>
      </div> */}

      {/* 맵 이동 시 화장실 재 검색 버튼 */}
      {isMoveMap && (
        <button
          className="absolute bottom-[5rem] z-10 flex justify-center items-center px-5 py-1 mx-auto mt-5 mb-5 text-blue-500 bg-white rounded-lg shadow-lg transition duration-300 ease-in-out delay-150 text-md justify-cent active:bg-gray-200"
          onClick={() => {
            getData();
            setIsMoveMap(false);
          }}
        >
          <GrRefresh className="mr-2" />현 지도에서 검색
        </button>
      )}

      {/* 현 위치로 이동 */}
      <div
        className="group flex absolute bottom-[6rem] left-0 z-10 justify-center items-center rounded-full w-[5rem] h-[5rem]"
        onClick={() => {
          if (currentLocation.lat && currentLocation.lng) {
            setCenter({ lat: currentLocation.lat, lng: currentLocation.lng });
            console.log(currentLocation);
          } else {
            getCurrentPosition().then(() => {
              if (currentLocation.lat && currentLocation.lng)
                setCenter({
                  lat: currentLocation.lat,
                  lng: currentLocation.lng,
                });
            });
          }
        }}
      >
        <button className="flex justify-center items-center w-[3rem] h-[3rem] bg-white border rounded-full shadow-lg group-active:bg-gray-200">
          <MdOutlineMyLocation className="text-3xl" />
        </button>
      </div>
    </div>
  );
}
