import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Notfound from "./pages/Notfound";

import { getEmtionImages } from "./utils/get-emotion-images";

function App() {
  return (
    <>
      <div>
        <img src={getEmtionImages(1)} />
        <img src={getEmtionImages(2)} />
        <img src={getEmtionImages(3)} />
        <img src={getEmtionImages(4)} />
        <img src={getEmtionImages(5)} />
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/new">New</Link>
        <Link to="/diary">Diary</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
