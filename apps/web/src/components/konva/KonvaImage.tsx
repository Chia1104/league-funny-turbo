import { Stage, Layer, Image } from "react-konva";
import { forwardRef } from "react";
import Konva from "konva";

interface KonvaImageProps {
  width: number;
  height: number;
  src: any;
}

const KonvaImage = forwardRef<Konva.Stage, KonvaImageProps>(
  ({ width, height, src }, ref) => {
    return (
      <Stage width={width} height={height} ref={ref}>
        <Layer>
          <Image image={src} draggable />
        </Layer>
      </Stage>
    );
  }
);

KonvaImage.displayName = "KonvaImage";

export type { KonvaImageProps };
export default KonvaImage;
