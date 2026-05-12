import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotes } from "@/context/NotesContext";
import { defaultHeaderBgImage } from "@/data/notes";

const NoteEditorScreen = () => {
  const { noteId } = useLocalSearchParams<{ noteId?: string }>();
  const {
    notes,
    isDark,
    saveNote: saveNoteToStore,
    deleteNote: deleteNoteFromStore,
  } = useNotes();
  const { width, height } = useWindowDimensions();

  const note = useMemo(
    () => notes.find((item) => item.id === noteId),
    [noteId, notes]
  );

  const [title, setTitle] = useState(note?.title ?? "");
  const [body, setBody] = useState(note?.body ?? "");
  const [headerBgImage, setHeaderBgImage] = useState(
    note?.headerBgImage ?? defaultHeaderBgImage
  );

  const contentWidth = Math.min(width - 32, 860);
  const headerHeight = Math.min(Math.max(height * 0.22, 150), 230);
  const styles = createStyles(isDark, contentWidth, headerHeight);

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  };

  const saveNote = () => {
    saveNoteToStore({
      id: note?.id,
      title,
      body,
      headerBgImage,
    });
    goBack();
  };

  const pickHeaderImage = async () => {
    if (Platform.OS !== "web") {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Photo access needed",
          "Allow photo library access to choose a note header image."
        );
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.85,
    });

    if (!result.canceled) {
      setHeaderBgImage(result.assets[0].uri);
    }
  };

  const deleteNote = () => {
    if (!note?.id) {
      return;
    }

    deleteNoteFromStore(note.id);
    goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.editorShell}>
            <Pressable
              accessibilityRole="imagebutton"
              onPress={pickHeaderImage}
              style={({ pressed }) => [
                styles.headerPressable,
                pressed ? styles.pressed : null,
              ]}
            >
              <ImageBackground
                source={{ uri: headerBgImage.trim() || defaultHeaderBgImage }}
                style={styles.headerImage}
                imageStyle={styles.headerImageRadius}
              >
                <View style={styles.headerOverlay}>
                <Pressable
                  accessibilityRole="button"
                  onPress={goBack}
                  style={({ pressed }) => [
                    styles.iconButton,
                    pressed ? styles.pressed : null,
                  ]}
                >
                  <Ionicons
                    name="arrow-back"
                    size={22}
                    color={isDark ? "#F7F4EA" : "#171C26"}
                  />
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  onPress={saveNote}
                  style={({ pressed }) => [
                    styles.saveButton,
                    pressed ? styles.pressed : null,
                  ]}
                >
                  <Ionicons
                    name="checkmark"
                    size={19}
                    color={isDark ? "#171C26" : "#FFFFFF"}
                  />
                  <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
                </View>

                <View style={styles.headerImageHint}>
                  <Ionicons name="image-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.headerImageHintText}>Change image</Text>
                </View>
              </ImageBackground>
            </Pressable>

            <View style={styles.form}>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Note title"
                placeholderTextColor={isDark ? "#8E98A8" : "#7A7F88"}
                style={styles.titleInput}
                returnKeyType="next"
                selectionColor={isDark ? "#F7F4EA" : "#171C26"}
              />

              <Text style={styles.timestamp}>
                {note?.timestamp ?? "New note"}
              </Text>

              <TextInput
                value={body}
                onChangeText={setBody}
                placeholder="Start writing..."
                placeholderTextColor={isDark ? "#8E98A8" : "#7A7F88"}
                style={styles.bodyInput}
                multiline
                textAlignVertical="top"
                scrollEnabled={false}
                selectionColor={isDark ? "#F7F4EA" : "#171C26"}
              />
            </View>

            {note ? (
              <Pressable
                accessibilityRole="button"
                onPress={deleteNote}
                style={({ pressed }) => [
                  styles.deleteButton,
                  pressed ? styles.pressed : null,
                ]}
              >
                <Ionicons name="trash-outline" size={19} color="#D94A4A" />
                <Text style={styles.deleteButtonText}>Delete note</Text>
              </Pressable>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NoteEditorScreen;

const createStyles = (
  isDark: boolean,
  contentWidth: number,
  headerHeight: number
) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: isDark ? "#0F1218" : "#F4F1E7",
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      alignItems: "center",
      paddingHorizontal: 16,
      paddingBottom: 28,
    },
    editorShell: {
      width: contentWidth,
      flex: 1,
    },
    headerPressable: {
      borderRadius: 18,
    },
    headerImage: {
      height: headerHeight,
      justifyContent: "space-between",
      backgroundColor: isDark ? "#252B36" : "#D9D2C1",
      borderRadius: 18,
      overflow: "hidden",
    },
    headerImageRadius: {
      borderRadius: 18,
    },
    headerOverlay: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: 14,
      backgroundColor: isDark ? "rgba(0, 0, 0, 0.28)" : "rgba(0, 0, 0, 0.12)",
    },
    headerImageHint: {
      alignSelf: "flex-end",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      margin: 14,
      paddingHorizontal: 12,
      minHeight: 36,
      borderRadius: 18,
      backgroundColor: "rgba(15, 18, 24, 0.72)",
    },
    headerImageHintText: {
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: "800",
    },
    iconButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "rgba(15, 18, 24, 0.82)" : "#FFFFFF",
    },
    saveButton: {
      minHeight: 44,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingHorizontal: 16,
      borderRadius: 22,
      backgroundColor: isDark ? "#F7F4EA" : "#171C26",
    },
    saveButtonText: {
      color: isDark ? "#171C26" : "#FFFFFF",
      fontSize: 15,
      fontWeight: "800",
    },
    pressed: {
      opacity: 0.78,
    },
    form: {
      flex: 1,
      marginTop: 20,
      padding: 18,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: isDark ? "#303746" : "#D9D2C1",
      backgroundColor: isDark ? "#181B22" : "#FFFFFF",
    },
    titleInput: {
      minHeight: 58,
      color: isDark ? "#F7F4EA" : "#171C26",
      fontSize: 30,
      fontWeight: "800",
      lineHeight: 36,
    },
    timestamp: {
      marginTop: 4,
      marginBottom: 16,
      color: isDark ? "#AEB7C6" : "#68707C",
      fontSize: 13,
      fontWeight: "700",
    },
    bodyInput: {
      minHeight: 360,
      color: isDark ? "#E8ECF3" : "#303743",
      fontSize: 17,
      lineHeight: 26,
    },
    deleteButton: {
      minHeight: 48,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 16,
      marginBottom: 10,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: isDark ? "#643036" : "#F0B8B8",
      backgroundColor: isDark ? "#28181B" : "#FFF1F1",
    },
    deleteButtonText: {
      color: "#D94A4A",
      fontSize: 15,
      fontWeight: "800",
    },
  });
