import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import SortingVisualizer from "./Screens/SortingVisualizer/SortingVisualizer";
import Graph from "./Screens/Graph";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SortingVisualizer />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </Router>
  );
}

export default App;
