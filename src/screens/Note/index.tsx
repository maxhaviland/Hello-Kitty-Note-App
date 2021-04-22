import React, { FC, useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  LayoutRectangle,
  Route,
  Alert,
} from "react-native";
import { NoteService } from "../../services/note.service";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { CharacterContent } from "../../components/CharacterContent";
import { LinearGradientBackground } from "../../components/LinearGradientBackground";
import { AntDesign } from "@expo/vector-icons";

import { ModalColors, defaultColors } from "../../components/ModalColors";
import { ModalImages } from "../../components/ModalImages";
import { ImageFile } from "../../components/ModalImages/images";
import { useImage } from "../../hooks/useImage";
import { ScreenNavigationProp } from "../../types";
import { Note } from '../../models/note.model';

const randomColor = () =>
  defaultColors[Math.floor(Math.random() * defaultColors.length)];

type NoteScreenProps = {
  navigation: ScreenNavigationProp;
  route: Route;
};
export const NoteScreen: FC<NoteScreenProps> = ({ route, navigation }) => {
  const [deviceSize, setDeviceSize] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const [visibleModalColors, setVisibleModalColors] = useState<boolean>(false);
  const [visibleModalImages, setVisibleModalImages] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(randomColor());
  const [selectedImage, setSelectedImage] = useState<ImageFile>(
    {} as ImageFile
  );

  const [text, setText] = useState("");

  const { image } = useImage(route.params.image);

  const openModalColors = () => setVisibleModalColors(true);
  const closeModalColors = () => setVisibleModalColors(false);

  const openModalImages = () => setVisibleModalImages(true);
  const closeModalImages = () => setVisibleModalImages(false);

  const selectColor = (color: string) => {
    setSelectedColor(color);
    closeModalColors();
  };

  const selectImage = (image: ImageFile) => {
    setSelectedImage(image);
    closeModalImages();
  };

  const goToHomeScreen = () => navigation.navigate("HomeScreen");

  const noteValidationAlert = () => {
    return Alert.alert("A sua nota não pode ser vazia", "", [
      {
        text: "ENTENDI",
        onPress: () => {},
        style: "default",
      },
    ]);
  };

  const createNote = () => {
    if (!text.trim()) return noteValidationAlert();
    
    const note = new Note({text, image: selectedImage.name, color: selectedColor})
    NoteService.createNote(note);
    goToHomeScreen();
  };

  const updateNote = () => {
    if (!text.trim()) return noteValidationAlert();
    const note = new Note({ 
      id: route.params.id,
      text,
      image: selectedImage.name,
      color: selectedColor,
    });
    NoteService.updateNote(note);
    goToHomeScreen();
  };

  const deleteNote = () => {
    Alert.alert("Excluir Nota", "Tem certeza que deseja excluir esta nota?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => {
          NoteService.deleteNoteById(route.params.id);
          goToHomeScreen();
        },
      },
    ]);
  };

  useEffect(() => {
    route.params.id && setSelectedImage(image);
    route.params.color && setSelectedColor(route.params.color);
    route.params.text && setText(route.params.text);
  }, []);

  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent }) => setDeviceSize(nativeEvent.layout)}
    >
      <LinearGradientBackground>
        <CharacterContent>
          <View
            style={[{ backgroundColor: selectedColor }, styles.boxTextView]}
          >
            <Image
              resizeMode="contain"
              source={selectedImage.file || ""}
              style={styles.figure}
            />
            <TextInput
              value={text}
              style={styles.textArea}
              onChangeText={(textChanged) => setText(textChanged)}
              placeholder="write your cute note here"
              multiline
              editable
            />
          </View>
        </CharacterContent>
        <TouchableOpacity
          onPress={openModalColors}
          style={[styles.defaultButtonProps, styles.paletteButton]}
        >
          <Ionicons name="ios-color-palette" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={route.params.id ? deleteNote : goToHomeScreen}
          style={[styles.defaultButtonProps, styles.trashButton]}
        >
          <Entypo
            name={route.params.id ? "trash" : "cross"}
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openModalImages}
          style={[styles.defaultButtonProps, styles.imageButton]}
        >
          <MaterialCommunityIcons
            name="image-multiple"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={route.params.id ? updateNote : createNote}
          style={[styles.defaultButtonProps, styles.checkButton]}
        >
          <AntDesign name="check" size={30} color="white" />
        </TouchableOpacity>
      </LinearGradientBackground>
      <ModalColors
        deviceSize={deviceSize}
        visible={visibleModalColors}
        onRequestClose={closeModalColors}
        onSelectColor={(color) => selectColor(color)}
      />
      <ModalImages
        visible={visibleModalImages}
        onSelectImage={(image) => selectImage(image)}
        onRequestClose={closeModalImages}
      />
    </View>

    // <View style={{height: '100%', backgroundColor: '#ed2f2f'}}>
    //       {/* <ActionItem onPress={create}  source={require('../../assets/save.png')} />
    //       <ActionItem onPress={() => console.log('cancel')} source={require('../../assets/cancel.png')} /> */}

    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxTextView: {
    flex: 1,
    opacity: 0.7,
    padding: 20,
  },
  textArea: {
    flex: 1,
    height: "100%",
    width: "100%",
    top: 0,
    padding: 20,
    fontSize: 18,
    textAlignVertical: "top",
    textAlign: "center",
  },
  defaultButtonProps: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ff7b7b",
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    borderRadius: 50,
    position: "absolute",
    zIndex: 9,
  },
  checkButton: {
    bottom: 5,
    alignSelf: "center",
  },
  trashButton: {
    bottom: 210,
    left: 5,
  },
  paletteButton: {
    bottom: 130,
    left: 5,
  },
  imageButton: {
    bottom: 50,
    left: 5,
  },
  figure: {
    height: "60%",
    width: "60%",
    alignSelf: "center",
    opacity: 0.3,
    position: "absolute",
    bottom: 0,
  },
});
