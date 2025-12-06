import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export default function TabSelector({ tabs, activeTab, onChange }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tabButton,
            activeTab === tab && styles.activeTabButton,
          ]}
          onPress={() => onChange(tab)}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F1F1F5",
    padding: 1,
    borderRadius: 30,
    marginBottom: 10,
    width: 300,
    alignSelf: "center",
  },

  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  activeTabButton: {
    backgroundColor: COLORS.primary,
  },

  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.placeholder,
  },

  activeTabText: {
    color: "#fff",
  },
});
