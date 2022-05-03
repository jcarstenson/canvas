import React, { useCallback } from 'react';
import Canvas from './Canvas';

function App() {
  let x: number, y: number;
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    if (frameCount === 0 || frameCount % 100 === 0) {
      x = 100 + Math.random() * 500;
      y = 100 + Math.random() * 500;
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(
      x,
      y,
      20 * Math.sin(frameCount * 0.05) ** 2,
      0,
      2 * Math.PI * Math.sin(frameCount * 0.05) ** 2
    );
    ctx.fill();
  };

  return (
    <Canvas draw={draw} height={window.innerHeight-20} width={window.innerWidth-10} />
  );
}

export default App;
