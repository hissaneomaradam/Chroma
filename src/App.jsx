import Home from "./components/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Play from "./components/Play";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </Router>
  )
}

export default App
