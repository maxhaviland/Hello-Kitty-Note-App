import React, { FC } from "react";
import { Note } from "../../types";
import { useImage } from "../../hooks/useImage";
import { Box, NoteText } from "./styles";
import { Image, StyleSheet } from "react-native";

interface NoteProps {
  note: Note;
}

export const NoteItem: FC<NoteProps> = ({ note }) => {
  const { image } = useImage(note.image);

  React.useEffect(() => {
    console.log(image);
    console.log(note);
  }, []);

  return (
    note && (
      <Box style={{ alignSelf: "center" }} backgroundColor={note.color}>
        <NoteText numberOfLines={8}>{note.text}</NoteText>
        {image && (
          <Image
            resizeMode="contain"
            style={styles.imageNote}
            source={image.file}
          />
        )}
      </Box>
    )
  );
};

const styles = StyleSheet.create({
  imageNote: {
    height: 180,
    width: 180,
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    alignSelf: "center",
    opacity: 0.3,
  },
});
