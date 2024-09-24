import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Heart from "./pages/Heart/Heart";
import Add from "./pages/Add/Add";
import My from "./pages/My/My";
import BottomMenu from "./component/BottomMenu";


function App() {
  const height = window.innerHeight;
  return (
    <div style={{height: `${height}px`}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/heart" element={<Heart />} />
        <Route path="/add" element={<Add />} />
        <Route path="/my" element={<My />} />
      </Routes>
      <div className="flex absolute bottom-0 z-[999] flex-col justify-center items-center w-full">
        <BottomMenu/>
      </div>
    </div>
  );
}

export default App;