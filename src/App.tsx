import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Skyline from "./Components/Skyline";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<Skyline />} />
      </Routes>
    </main>
  );
}

export default App;
