import React, { useState } from "react";

const Login: React.FC = () => {
  const [password, setPassword] = useState<string>("");

  // handleSubmit 함수에 타입을 명시
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Password: "+ password);
  };

  // 비밀번호 입력 핸들러에도 타입 추가
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100 dark:bg-gray-800">
      <div className="p-8 w-80 bg-white rounded-lg shadow-lg dark:bg-gray-700">
        <h2 className="mb-6 text-2xl font-bold text-center dark:text-white">화장실이 어디야!!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter your password"
              className="p-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none dark:bg-gray-500"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="py-2 w-full text-white bg-blue-500 rounded-lg transition duration-200 hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;