import React, { FC } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

type ColorObject = {
  strong: string;
  medium: string;
  weak: string;
};

type LinearGradientBackgroundProps = {
  colors?: ColorObject;
};

export const LinearGradientBackground: FC<LinearGradientBackgroundProps> = ({
  colors,
  children,
}) => {
  const selectedColors: string[] = [
    (colors && colors.strong) || "",
    (colors && colors.medium) || "",
    (colors && colors.weak) || "",
  ];

  return (
    <LinearGradient colors={selectedColors} style={styles.container}>
      {children}
    </LinearGradient>
  );
};

LinearGradientBackground.defaultProps = {
  colors: {
    strong: "#ff0000",
    medium: "#ff7b7b",
    weak: "#ffcdcd",
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
    position: "relative",
  },
});
