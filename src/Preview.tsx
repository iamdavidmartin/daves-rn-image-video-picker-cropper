import React, { useCallback, useEffect, useRef } from "react";
import { Image, StyleSheet, Dimensions, ImageStyle } from "react-native";
// @ts-ignore
import ViewTransformer from "react-native-easy-view-transformer";
import { PreviewProps, Transform } from "../types";

const { width } = Dimensions.get("window");

const UNTRANSFORMED = {
  scale: 1,
  translateX: 0,
  translateY: 0,
} as Transform;

export function Preview(props: PreviewProps) {
  const { item, itemIndex, maxScale, onCropParamsChanged, transform } = props;
  const transformView = useRef();

  useEffect(() => {
    if (!transformView.current) return;
    let tf = transform || UNTRANSFORMED;
    // @ts-ignore
    transformView.current!.updateTransform(tf);
    console.log(tf);
  }, [transform]);

  const handleTransformGestureReleased = useCallback(
    (params: Transform) => {
      if (params.scale < 1) params = UNTRANSFORMED; // you can't shrink the image. sry not sry.
      onCropParamsChanged(params, itemIndex);
    },
    [itemIndex]
  );

  if (!item) return null;
  return (
    <ViewTransformer
      ref={transformView}
      style={styles.item}
      maxScale={maxScale}
      onTransformGestureReleased={handleTransformGestureReleased}
    >
      <Image source={{ uri: item.node.image.uri }} style={styles.item} />
    </ViewTransformer>
  );
}

const styles = StyleSheet.create({
  item: {
    width: width,
    height: width,
  } as ImageStyle,
});
