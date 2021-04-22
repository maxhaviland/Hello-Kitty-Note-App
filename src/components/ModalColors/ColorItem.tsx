import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

type ColorItemProps = {
  color: string;
  height?: number | string;
  width?: number | string;
};

export const ColorItem: FC<ColorItemProps> = ({
  color,
  height = 50,
  width = 50,
}) => {
  React.useEffect(() => {
    console.log(height);
  }, []);
  return (
    <View
      style={[{ backgroundColor: color, height: height, width: "100%" }]}
    ></View>
  );
};

const styles = StyleSheet.create({});
