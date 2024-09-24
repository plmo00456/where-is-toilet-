import React, { useState } from 'react';

const DraggableBottomLayer: React.FC = () => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0); // 드래그 시작 Y 좌표
  const [position, setPosition] = useState<number>(0); // 최상위 요소의 Y 위치

  // 드래그 시작 함수
  const startDrag = (clientY: number) => {
    setDragging(true);
    setStartY(clientY - position); // 드래그 시작 위치 설정
  };

  // 드래그 이동 함수
  const moveDrag = (clientY: number) => {
    if (dragging) {
      const newY = clientY - startY; // 새로운 Y 좌표 계산
      setPosition(newY); // 위치 업데이트
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    startDrag(e.clientY); // 마우스를 눌렀을 때 드래그 시작
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startDrag(e.touches[0].clientY); // 터치를 시작했을 때 드래그 시작
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    moveDrag(e.clientY); // 마우스 이동 시 드래그 처리
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    moveDrag(e.touches[0].clientY); // 터치 이동 시 드래그 처리
  };

  const stopDrag = () => {
    setDragging(false); // 드래그 종료
  };

  const handleMouseUp = () => {
    stopDrag(); // 마우스 버튼을 놓았을 때 드래그 종료
  };

  const handleTouchEnd = () => {
    stopDrag(); // 터치가 끝났을 때 드래그 종료
  };

  return (
    <div
      className="flex flex-col absolute bottom-0 hover:-translate-y-6 z-30 justify-center items-center w-full h-[87%] bg-white shadow-[rgba(0,0,15,0.5)_0px_-5px_30px_-10px] "
      style={{ transform: `translateY(${position}px)` }} // Y 위치에 따라 최상위 요소 이동
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
      onMouseLeave={handleMouseUp} // 마우스가 영역 밖으로 나가도 드래그 중지
    >
      <div className="flex absolute top-0 justify-center items-center w-full h-5 group"
        onMouseDown={handleMouseDown} // 부모 요소 클릭 시 드래그 시작
        onTouchStart={handleTouchStart} // 터치 시 드래그 시작
      >
        <div className="bg-gray-300 group-active:bg-gray-400 rounded-lg h-1 w-[3rem]"></div>
      </div>
      <div>b</div>
    </div>
  );
};

export default DraggableBottomLayer;