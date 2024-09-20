import Spinner from "../../assets/common/spinner.gif";

export default () => {
  return (
    <div
      className="flex overflow-hidden absolute top-0 left-0 z-50 flex-col justify-center items-center w-screen h-full bg-gray-800 bg-opacity-50">
      <div className="mt-10 text-3xl text-white">잠시만 기다려 주세요.</div>
      <img src={Spinner} alt="로딩중" className="w-[10rem]" />
    </div>
  );
};
