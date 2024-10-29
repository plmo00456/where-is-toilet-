import React, { useState, useEffect } from 'react';

interface DraggableBottomLayerProps {
  elements: React.ReactNode[];
}

const DraggableBottomLayer: React.FC<DraggableBottomLayerProps> = ({ elements }) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const MAX_POSITION = window.innerHeight * 0.75; // 최대값
  const MIN_POSITION = window.innerHeight * 0.005; // 최소값
  const MID_POSITION = window.innerHeight * 0.45; // 중간값

  useEffect(() => {
    const initialPosition = MAX_POSITION; // 기본값 설정
    setPosition(initialPosition);
  }, []);

  const startDrag = (clientY: number) => {
    setDragging(true);
    setStartY(clientY - position);
  };

  const moveDrag = (clientY: number) => {
    if (dragging) {
      const newY = clientY - startY;
      // 최대값과 최소값으로 제한
      setPosition(Math.min(Math.max(newY, elements.length == 1 ? MID_POSITION : MIN_POSITION), MAX_POSITION));
    }
  };

  const stopDrag = () => {
    if (position < MAX_POSITION && position >= MID_POSITION) {
      setPosition(MID_POSITION); // 중간값으로 이동
    } else if (position < MID_POSITION && position >= MIN_POSITION) {
      setPosition(MIN_POSITION); // 최소값으로 이동
    } else if (position < MIN_POSITION) {
      setPosition(MIN_POSITION); // 최소값으로 고정
    }
    setDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      moveDrag(e.clientY);
    };

    const handleMouseUp = () => {
      stopDrag();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, position]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    startDrag(e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startDrag(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    moveDrag(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    stopDrag();
  };

  const renderContent = () => {
    if (elements.length === 1) {
      return (
        <div className='flex w-full h-full'>
          {elements[0]}
        </div>
      );
    } else if (elements.length === 2) {
      return (
        <>
          <div className='flex w-full h-[37%]'>
            {elements[0]}
          </div>
          <div className='flex w-full h-[63%]'>
            {elements[1]}
          </div>
        </>
      );
    } else {
      return (
        <div className='flex w-full h-full'>
        </div>
      );
    }
  };

  return (
    <div
      className={`flex flex-col absolute bottom-0 hover:-translate-y-6 z-30 w-full h-[87%] bg-white shadow-[rgba(0,0,15,0.5)_0px_-5px_30px_-10px] ${elements.length == 0 ? 'hidden': ''}`}
      style={{ transform: `translateY(${position}px)` }}
    >
      <div className="flex absolute top-0 justify-center items-center w-full h-8 group active:cursor-grabbing hover:cursor-grab touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="bg-gray-300 group-active:bg-gray-400 rounded-lg h-1 w-[3rem]"></div>
      </div>
      <div className='flex flex-col mt-10 h-full'>
        {renderContent()}
      </div>
    </div>
  );
};

export default DraggableBottomLayer;
