import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { FC, useMemo, useState } from "react";
import {
  Modal,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  LayoutChangeEvent,
  LayoutRectangle,
  Image,
  Touchable,
} from "react-native";
import { images, ImageFile } from "./images";

type ModalImagesProps = {
  deviceSize?: LayoutRectangle;
  visible?: boolean;
  onRequestClose?: () => void;
  onSelectImage?: (image: any) => any;
};

export const ModalImages: FC<ModalImagesProps> = ({
  deviceSize = {} as LayoutRectangle,
  visible = false,
  onRequestClose,
  onSelectImage = (image) => console.log(image),
}) => {
  const [open, setOpen] = useState<boolean>(visible);

  if (!visible) return <></>;

  return (
    <TouchableOpacity onPress={onRequestClose} style={styles.container}>
      <View style={styles.container}>
        <View onTouchStart={() => console.log(1)} style={styles.modal}>
          <TouchableOpacity onPress={onRequestClose} style={styles.closeButton}>
            <Ionicons name="close-outline" size={25} color="black" />
          </TouchableOpacity>
          <FlatList
            data={images}
            numColumns={4}
            columnWrapperStyle={styles.row}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelectImage(item)}>
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={item.file}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    alignSelf: "center",
    zIndex: 10,
  },
  closeButton: {
    alignSelf: "center",
  },
  modal: {
    flex: 1,
    height: "70%",
    width: "80%",
    backgroundColor: "#ffffff",
    paddingTop: 20,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    alignSelf: "center",
  },
  image: {
    height: 100,
    width: 80,
  },
  row: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
});
