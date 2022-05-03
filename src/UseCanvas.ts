// Adapted from lucas-lm/react-canvas-dom
import React, { useRef, useEffect } from "react";

export interface UseCanvasOptions {
  context: string;
}

const updateCanvasSize = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
  const { width, height } = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);
    return true;
  }

  return false;
};

const useCanvas = (draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void, options?: UseCanvasOptions) : React.RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);  

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext(options?.context || '2d') as CanvasRenderingContext2D;

    let frameCount = 0;
    let animationFrameId: number;

    if (canvas !== null && context !== null){
      const render = () => {
        frameCount++;
        updateCanvasSize(canvas, context);
        draw(context, frameCount);
        animationFrameId = window.requestAnimationFrame(render);
      };

      render();
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, options]);

  return canvasRef;
}

export default useCanvas;