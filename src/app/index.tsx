import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  type StyleProp,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteCard from "@/components/NoteCard";
import { useNotes } from "@/context/NotesContext";
import type { Note } from "@/data/notes";

const NotesListingScreen = () => {
  const { notes, isDark, setIsDark } = useNotes();
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState("");

  const isTablet = width >= 720;
  const horizontalPadding = isTablet ? 24 : 16;
  const cardGap = isTablet ? 18 : 14;
  const columnCount = isTablet ? 2 : 1;
  const listWidth = width - horizontalPadding * 2;
  const cardWidth = columnCount === 2 ? (listWidth - cardGap) / 2 : "100%";
  const styles = createStyles(isDark, horizontalPadding, cardGap);
  const screenStyle: StyleProp<ViewStyle> = StyleSheet.compose(
    styles.screen,
    styles.screenTheme
  );

  const filteredNotes = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return notes;
    }

    return notes.filter((note) => {
      const searchableText = `${note.title} ${note.body} ${note.timestamp}`;
      return searchableText.toLowerCase().includes(normalizedQuery);
    });
  }, [notes, searchQuery]);

  const openEditor = (note?: Note) => {
    router.push({
      pathname: "/editor",
      params: note ? { noteId: note.id } : {},
    });
  };

  return (
    <SafeAreaView style={screenStyle}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notes</Text>
        </View>

        <View style={styles.themeToggle}>
          <Ionicons
            name={isDark ? "moon" : "sunny"}
            size={17}
            color={isDark ? "#D7E0EE" : "#C47A00"}
          />
          <Switch
            value={isDark}
            onValueChange={setIsDark}
            trackColor={{ false: "#D7D1C2", true: "#394151" }}
            thumbColor={isDark ? "#F7F4EA" : "#FFFFFF"}
          />
        </View>
      </View>

      <View style={styles.toolbar}>
        <View style={styles.searchBox}>
          <Ionicons
            name="search"
            size={20}
            color={isDark ? "#AEB7C6" : "#68707C"}
          />
          <TextInput
            placeholder="Search notes"
            placeholderTextColor={isDark ? "#AEB7C6" : "#68707C"}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>
      </View>

      <FlatList
        key={columnCount}
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        numColumns={columnCount}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={columnCount > 1 ? styles.columnWrapper : undefined}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cardSlot}>
            <NoteCard
              title={item.title}
              body={item.body}
              timestamp={item.timestamp}
              headerBgImage={item.headerBgImage}
              cardWidth={cardWidth}
              isDark={isDark}
              onPress={() => openEditor(item)}
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No notes found</Text>
            <Text style={styles.emptyBody}>Try a different search term.</Text>
          </View>
        }
      />

      <Pressable
        accessibilityRole="button"
        onPress={() => openEditor()}
        style={({ pressed }) => [
          styles.floatingAddButton,
          pressed ? styles.pressed : null,
        ]}
      >
        <Ionicons name="add" size={30} color={isDark ? "#171C26" : "#FFFFFF"} />
      </Pressable>
    </SafeAreaView>
  );
};

export default NotesListingScreen;

const createStyles = (
  isDark: boolean,
  horizontalPadding: number,
  cardGap: number
) =>
  StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: horizontalPadding,
  },
  screenTheme: {
    backgroundColor: isDark ? "#0F1218" : "#F4F1E7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 18,
  },
  eyebrow: {
    color: isDark ? "#AEB7C6" : "#68707C",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    color: isDark ? "#F7F4EA" : "#171C26",
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 48,
  },
  themeToggle: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 10,
    paddingRight: 4,
    borderRadius: 17,
    backgroundColor: isDark ? "#181B22" : "#FFFFFF",
    borderWidth: 1,
    borderColor: isDark ? "#303746" : "#D9D2C1",
  },
  pressed: {
    opacity: 0.78,
  },
  toolbar: {
    gap: 12,
    marginBottom: 18,
  },
  searchBox: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: isDark ? "#303746" : "#D9D2C1",
    backgroundColor: isDark ? "#181B22" : "#FFFFFF",
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    color: isDark ? "#F7F4EA" : "#171C26",
    fontSize: 16,
    minHeight: 48,
  },
  listContent: {
    paddingBottom: 104,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cardSlot: {
    marginBottom: cardGap,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
  },
  emptyTitle: {
    color: isDark ? "#F7F4EA" : "#171C26",
    fontSize: 20,
    fontWeight: "800",
  },
  emptyBody: {
    color: isDark ? "#AEB7C6" : "#68707C",
    fontSize: 15,
    marginTop: 8,
  },
  floatingAddButton: {
    position: "absolute",
    right: horizontalPadding,
    bottom: 24,
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: isDark ? "#F7F4EA" : "#171C26",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: isDark ? 0.32 : 0.2,
    shadowRadius: 18,
    elevation: 8,
  },
});
