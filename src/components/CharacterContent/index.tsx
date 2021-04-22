import React, { FC } from "react";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";

type CharacterContentProps = {
  image?: ImageSourcePropType;
};

export const CharacterContent = ({
  children,
  image = require("../../../assets/images/characters/hello_kitty.png"),
}) => {
  return (
    <View style={styles.view}>
      <Image style={styles.image} source={image} />
      <View style={styles.paper}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
  },
  image: {
    height: 140,
    width: 140,
    alignSelf: "center",
    zIndex: 10,
    resizeMode: "cover",
  },
  paper: {
    marginTop: 100,
    borderRadius: 6,
    backgroundColor: "white",
    position: "absolute",
    height: "84%",
    width: "90%",
    borderWidth: 2,
    borderColor: "white",
    padding: 15,
    alignSelf: "center",
  },
});
