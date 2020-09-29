import React from "react";
import { Text } from "react-native";

export interface HeaderProps {
  nextTitle: string;
}

export function Header(props: HeaderProps) {
  const { nextTitle } = props;

  return <Text>{nextTitle}</Text>;
}
