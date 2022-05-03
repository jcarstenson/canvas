import { FC } from "react";
import useCanvas, {UseCanvasOptions} from './UseCanvas';

interface CanvasProps {
  height: number;
  width: number;
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
  options?: UseCanvasOptions;
}

const Canvas: FC<CanvasProps> = ({height, width, draw, options}) => {
  const canvasRef = useCanvas(draw, options);

  return (
    <canvas ref={canvasRef} height={height} width={width} />
  );
};

export default Canvas;