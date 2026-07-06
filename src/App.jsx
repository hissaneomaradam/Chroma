import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ColorCardRandom from "./components/ColorCardRandom";
import Pick from "./components/Pick";
import Results from "./components/Results";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next"

function App() {
  return (
    <Router>
      <Routes>
        <Analytics />
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<ColorCardRandom />} />
        <Route path="/pick" element={<Pick />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
