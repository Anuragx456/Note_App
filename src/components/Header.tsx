import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const HeaderScreen = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Notes</Text>
      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: isDark }}
        onPress={() => setIsDark((currentValue) => !currentValue)}
        style={[
          styles.themeSwitch,
          isDark ? styles.themeSwitchDark : styles.themeSwitchLight,
        ]}
      >
        <View
          style={[
            styles.switchThumb,
            isDark ? styles.switchThumbRight : styles.switchThumbLeft,
          ]}
        >
          <Ionicons
            name={isDark ? "moon" : "sunny"}
            size={18}
            color={isDark ? "#171C26" : "#F59E0B"}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default HeaderScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  headerText: {
    fontWeight: "700",
    fontSize: 45,
    lineHeight: 52,
    color: "#171C26",
  },
  themeSwitch: {
    width: 54,
    height: 34,
    borderRadius: 17,
    padding: 4,
    justifyContent: "center",
  },
  themeSwitchDark: {
    backgroundColor: "#171C26",
    alignItems: "flex-end",
  },
  themeSwitchLight: {
    backgroundColor: "#E5E7EB",
    alignItems: "flex-start",
  },
  switchThumb: {
    width: 26,
    height: 26,
    borderRadius: 15,
    backgroundColor: "#CCCCBB",
    alignItems: "center",
    justifyContent: "center",
  },
  switchThumbRight: {
    marginLeft: 20,
  },
  switchThumbLeft: {
    marginLeft: 0,
  },
});
