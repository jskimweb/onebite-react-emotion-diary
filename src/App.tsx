import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Notfound from "./pages/Notfound";
import Header from "./components/Header";
import Button from "./components/Button";

function App() {
  return (
    <>
      <Header
        title="Header"
        leftChild={<Button text="left" type="DEFAULT" onClick={() => {}} />}
        rightChild={<Button text="right" type="DEFAULT" onClick={() => {}} />}
      />

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
