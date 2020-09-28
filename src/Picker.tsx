import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

export interface PickerProps {
  nextTitle: string;
}

export function Picker(props: PickerProps) {
  const { nextTitle } = props;
  return (
    <View style={styles.full}>
      <Text>{nextTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  full: {
    backgroundColor: "blue",
  } as ViewStyle,
});
