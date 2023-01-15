import React, { useState, useEffect, useRef } from "react";
import "./graph.css";

const Graph = () => {
  const canvasRef = useRef(null);
  return (
    <div id="graph" className="grid">
      <canvas
        id="canvas"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight / 1.5}
      />
    </div>
  );
};

const Node = ({ children }) => {
  return <div className="node">{children}</div>;
};

export default Graph;
