// @ts-nocheck
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, ViewStyle } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";

export interface LibraryProps {}

export function Library(props: LibraryProps) {
  useEffect(() => {
    CameraRoll.getPhotos({
      assetType: "All",
      first: 20,
    }).then((results) => {
      results.edges.forEach((e) => console.log(e));
    });
  }, []);
  return <View />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  content: {} as ViewStyle,
});
