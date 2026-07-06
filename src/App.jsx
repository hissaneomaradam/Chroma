import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ColorCardRandom from "./components/ColorCardRandom";
import Pick from "./components/Pick";
import Results from "./components/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<ColorCardRandom />} />
        <Route path="/pick" element={<Pick />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
