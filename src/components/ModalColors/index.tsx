import React, { FC, useMemo, useState } from "react";
import {
  Modal,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  LayoutChangeEvent,
  LayoutRectangle,
} from "react-native";
import { ColorItem } from "./ColorItem";

type ModalColorsProps = {
  deviceSize?: LayoutRectangle;
  colors?: string[];
  visible?: boolean;
  animationType?: "none" | "slide" | "fade";
  transparent?: boolean;
  onRequestClose?: () => void;
  onSelectColor?: (color: any) => any;
};

export const defaultColors = [
  "#ff9aa2",
  "#ffb7b2",
  "#ffdac1",
  "#e2f0cb",
  "#b5ead7",
  "#c7ceea",
];

export const ModalColors: FC<ModalColorsProps> = ({
  deviceSize = {} as LayoutRectangle,
  colors = defaultColors,
  visible = false,
  animationType,
  transparent,
  onRequestClose,
  onSelectColor = (color) => console.log(color),
}) => {
  const colorItemProps = useMemo(() => {
    const height = Math.ceil(deviceSize.height / colors.length);
    return {
      height,
    };
  }, [colors, deviceSize]);

  return (
    <Modal
      onRequestClose={onRequestClose}
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      style={styles.container}
    >
      <FlatList
        data={colors}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectColor(item)}>
            <ColorItem height={colorItemProps.height} color={item} />
          </TouchableOpacity>
        )}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    right: 0,
    height: "100vh",
    width: 50,
    maxWidth: 60,
    zIndex: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
