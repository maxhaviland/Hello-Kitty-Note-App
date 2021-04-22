import React, { FC, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Note, ScreenNavigationProp } from "../../types";
import { AntDesign } from "@expo/vector-icons";
import { NoteItem } from "../../components/NoteItem";
import { NoteService } from "../../services/note.service";

import { LinearGradientBackground } from "../../components/LinearGradientBackground";
import { CharacterContent } from "../../components/CharacterContent";

interface HomeScreenProps {
  navigation: ScreenNavigationProp;
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [notes, setNotes] = useState<Note[]>([] as Note[]);
  const [order, setOrder] = useState<string>("asc");

  const handleOrder = async () => {
    if (order === "asc") {
      setOrder("desc");
      await getNotes("desc");
    } else {
      setOrder("asc");
      await getNotes("asc");
    }
  };

  const getNotes = async (orderBy: "asc" | "desc" = "asc") => {
    const notes: Note[] = ((await NoteService.getAllNotes(
      orderBy
    )) as unknown) as Note[];
    setNotes(notes);
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => getNotes());
  }, [navigation]);

  const goToNoteScreen = (note?: Note) =>
    navigation.navigate("NoteScreen", note);

  return (
    <LinearGradientBackground>
      <CharacterContent>
        <Text style={styles.text}>{notes.length} notas</Text>
        <FlatList
          data={notes}
          style={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => goToNoteScreen(item)}>
              <NoteItem note={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </CharacterContent>
      <TouchableOpacity
        onPress={() => goToNoteScreen({} as Note)}
        style={styles.addButton}
      >
        <AntDesign name="plus" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOrder} style={styles.orderButton}>
        <AntDesign
          name={order === "desc" ? "up" : "down"}
          size={30}
          color="white"
        />
      </TouchableOpacity>
    </LinearGradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
    position: "relative",
  },
  homeBackground: {
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
    height: "84%",
    width: "90%",
    borderWidth: 2,
    borderColor: "white",
    position: "absolute",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  addButton: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ff7b7b",
    width: 60,
    height: 60,
    backgroundColor: "#ff0000",
    borderRadius: 50,
    position: "absolute",
    bottom: 15,
    right: 15,
    zIndex: 9,
  },
  orderButton: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ff7b7b",
    width: 60,
    height: 60,
    backgroundColor: "#ff0000",
    borderRadius: 50,
    position: "absolute",
    bottom: 15,
    left: 15,
    zIndex: 9,
  },
  list: {
    alignSelf: "center",
    width: "100%",
  },
  text: {
    textAlign: "center",
    marginBottom: 5,
    fontSize: 16,
    color: "#555555",
  },
});
