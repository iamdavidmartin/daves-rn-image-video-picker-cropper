import React from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  ImageStyle,
  TouchableHighlight,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { CameraRollItemProps } from "../types";

const { width } = Dimensions.get("window");

export function CameraRollItem(props: CameraRollItemProps) {
  const {
    item,
    toggleItemSelected,
    selected,
    index,
    selectionCount,
    multipleSelect,
  } = props;

  return (
    <TouchableHighlight
      onPress={() => toggleItemSelected(item, index)}
      style={{ opacity: selected ? 0.8 : 1 }}
    >
      <>
        {selected && (
          <View style={styles.itemNum}>
            <Text style={styles.itemNumText}>{selectionCount}</Text>
          </View>
        )}
        {multipleSelect && !selected && (
          <View style={styles.unselectedItemNum} />
        )}
        <Image source={{ uri: item.node.image.uri }} style={styles.item} />
      </>
    </TouchableHighlight>
  );
}

const globalStyles = StyleSheet.create({
  itemBubble: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1000,
    width: 25,
    height: 25,
    borderRadius: 15,
    margin: 5,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  } as ViewStyle,
});

const styles = StyleSheet.create({
  item: {
    width: width / 4 - 3 / 4,
    height: width / 4 - 3 / 4,
  } as ImageStyle,
  itemNum: {
    ...globalStyles.itemBubble,
    backgroundColor: "teal",
    borderColor: "white",
  } as ViewStyle,
  unselectedItemNum: {
    ...globalStyles.itemBubble,
    backgroundColor: "#ccc",
    borderColor: "white",
  } as ViewStyle,
  itemNumText: {
    color: "white",
    textAlign: "center",
  },
});
