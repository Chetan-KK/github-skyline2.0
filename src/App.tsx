import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import SkylinePage from "./Components/SkylinePage";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username/:year" element={<SkylinePage />} />
      </Routes>
    </main>
  );
}

export default App;
