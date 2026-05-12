import React from "react";
import {
  ImageBackground,
  type DimensionValue,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type NoteCardProps = {
  title: string;
  body: string;
  timestamp: string;
  headerBgImage: string;
  cardWidth: DimensionValue;
  isDark: boolean;
  onPress: () => void;
};

const NoteCard = ({
  title,
  body,
  timestamp,
  headerBgImage,
  cardWidth,
  isDark,
  onPress,
}: NoteCardProps) => {
  const styles = createStyles(isDark, cardWidth);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) =>
        StyleSheet.flatten([
          styles.container,
          pressed ? styles.containerPressed : null,
        ])
      }
    >
      <ImageBackground
        source={{ uri: headerBgImage }}
        style={styles.headerImage}
        imageStyle={styles.headerImageRadius}
      >
        <View style={styles.imageOverlay} />
      </ImageBackground>

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={2} style={styles.body}>
          {body}
        </Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </Pressable>
  );
};

export default NoteCard;

const createStyles = (isDark: boolean, cardWidth: DimensionValue) =>
  StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: isDark ? "#181B22" : "#FFFFFF",
    borderWidth: 1,
    borderColor: isDark ? "#2F3541" : "#E4E1D5",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: isDark ? 0.18 : 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  containerPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  headerImage: {
    height: 92,
    width: "100%",
    backgroundColor: "#D6D3C2",
    justifyContent: "flex-end",
  },
  headerImageRadius: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  imageOverlay: {
    height: "100%",
    backgroundColor: isDark ? "rgba(0, 0, 0, 0.24)" : "rgba(0, 0, 0, 0.08)",
  },
  content: {
    gap: 8,
    padding: 16,
  },
  title: {
    color: isDark ? "#F7F4EA" : "#171C26",
    fontSize: 19,
    fontWeight: "700",
    lineHeight: 24,
  },
  body: {
    color: isDark ? "#C9CED8" : "#4A515C",
    fontSize: 14,
    lineHeight: 20,
  },
  timestamp: {
    color: isDark ? "#9DA6B5" : "#7A7F88",
    fontSize: 12,
    fontWeight: "600",
  },
});
