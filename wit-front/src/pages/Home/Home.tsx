import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function Home() {
    const [state, setState] = useState({
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
      })
    
      useEffect(() => {
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setState((prev) => ({
                ...prev,
                center: {
                  lat: position.coords.latitude, // 위도
                  lng: position.coords.longitude, // 경도
                },
                isLoading: false,
              }))
            },
            (err) => {
              setState((prev) => ({
                ...prev,
                errMsg: err.message,
                isLoading: false,
              }))
            }
          )
        } else {
          // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
          setState((prev) => ({
            ...prev,
            errMsg: "geolocation을 사용할수 없어요..",
            isLoading: false,
          }))
        }
      }, [])

    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex w-full h-full">
                <Map
                    center={state.center}
                    style={{ width: "100%", height: "100%" }}
                    level={3}
                >
                    {!state.isLoading && (
                    <MapMarker position={state.center}>
                        <div style={{ padding: "5px", color: "#000" }}>
                        {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
                        </div>
                    </MapMarker>
                    )}
                </Map>
            </div>
            <div className="absolute top-3 w-[80%] z-10">
                <form className="mx-auto max-w-md">   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 items-center pointer-events-none start-0 ps-3">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 ps-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="장소, 주소 검색" required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">검색</button>
                    </div>
                </form>

            </div>
        </div>
    );
}