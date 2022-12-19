import { Stage, Layer, Image } from "react-konva";
import { type ForwardedRef } from "react";
import Konva from "konva";

interface KonvaImageProps {
  width: number;
  height: number;
  src: any;
}

const KonvaImage = ({
  ref,
  props,
}: {
  ref: ForwardedRef<Konva.Stage>;
  props: KonvaImageProps;
}) => {
  const { width, height, src } = props;
  return (
    <Stage width={width} height={height} ref={ref}>
      <Layer>
        <Image image={src} draggable />
      </Layer>
    </Stage>
  );
};

export { type KonvaImageProps };
export default KonvaImage;
