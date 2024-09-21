import { useEffect, useState } from "react";
import {
  TbMapSearch,
  TbMapHeart,
  TbUserCircle,
  TbMapPinPlus,
} from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 활성화된 메뉴를 추적하는 상태
  const [activeMenu, setActiveMenu] = useState("");

  // URL이 변경될 때 활성화된 메뉴 상태 업데이트
  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      setActiveMenu("home");
    } else if (path === "/heart") {
      setActiveMenu("heart");
    } else if (path === "/add") {
      setActiveMenu("add");
    } else if (path === "/my") {
      setActiveMenu("my");
    }
  }, [location.pathname]);

  // 메뉴별 경로 이동 함수
  const moveLink = (menu: string) => {
    switch (menu) {
      case "home":
        navigate("/");
        break;
      case "heart":
        navigate("/heart");
        break;
      case "add":
        navigate("/add");
        break;
      case "my":
        navigate("/my");
        break;
      default:
        navigate("/");
        break;
    }
  };

  // 활성화된 메뉴에 따라 동적으로 클래스를 적용하는 함수
  const getActiveClass = (menu: string) => {
    return activeMenu === menu ? "text-blue-500" : "text-gray-800";
  };

  // 메뉴별 위치를 설정하는 함수
  const getLeftPosition = () => {
    switch (activeMenu) {
      case "home":
        return "0%";
      case "heart":
        return "25%";
      case "add":
        return "50%";
      case "my":
        return "75%";
      default:
        return "0%";
    }
  };

  return (
    <div className="relative w-full">
      {/* 파란색 선 */}
      <div
        className="absolute top-0 z-30 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out"
        style={{
          width: "25%",
          left: getLeftPosition(),
        }}
      ></div>

      {/* 메뉴 아이템들 */}
      <div className="flex justify-center w-full bg-white shadow-[rgba(0,0,15,0.5)_0px_-5px_30px_-10px] h-[4rem] text-sm text-gray-800">
        {/* '주변' 메뉴 */}
        <div
          className="flex relative flex-col flex-1 justify-center items-center"
          onClick={() => moveLink("home")}
        >
          <TbMapSearch className={`text-2xl ${getActiveClass("home")}`} />
          <span className={getActiveClass("home")}>주변</span>
        </div>

        {/* '저장' 메뉴 */}
        <div
          className="flex relative flex-col flex-1 justify-center items-center"
          onClick={() => moveLink("heart")}
        >
          <TbMapHeart className={`text-2xl ${getActiveClass("heart")}`} />
          <span className={getActiveClass("heart")}>저장</span>
        </div>

        {/* '등록' 메뉴 */}
        <div
          className="flex relative flex-col flex-1 justify-center items-center"
          onClick={() => moveLink("add")}
        >
          <TbMapPinPlus className={`text-2xl ${getActiveClass("add")}`} />
          <span className={getActiveClass("add")}>등록</span>
        </div>

        {/* 'MY' 메뉴 */}
        <div
          className="flex relative flex-col flex-1 justify-center items-center"
          onClick={() => moveLink("my")}
        >
          <TbUserCircle className={`text-2xl ${getActiveClass("my")}`} />
          <span className={getActiveClass("my")}>MY</span>
        </div>
      </div>
    </div>
  );
}