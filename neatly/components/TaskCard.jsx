import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

export default function TaskCard({
  title,
  dueDate,
  dueTime,
  category,
  color = COLORS.primary,
  priority,
  completed,
  onToggle,
}) {
  const isCompleted = !!completed;
  return (
    <View style={[styles.card, completed && styles.completed]}>
      <View style={[styles.colorStrip, { backgroundColor: color }]} />

      <TouchableOpacity style={styles.checkZone} onPress={onToggle}>
        <View style={[styles.checkCircle, completed && styles.checkActive]}>
          {isCompleted && <Ionicons name="checkmark" size={14} color="#fff" />}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            completed && {
              textDecorationLine: "line-through",
              color: COLORS.placeholder,
            },
          ]}
        >
          {title}
        </Text>

        <View style={styles.metaRow}>
          {dueDate && (
            <View style={styles.metaItem}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color={COLORS.placeholder}
              />
              <Text style={styles.metaText}>{dueDate}</Text>
            </View>
          )}

          {dueTime && (
            <View style={styles.metaItem}>
              <Ionicons
                name="time-outline"
                size={16}
                color={COLORS.placeholder}
              />
              <Text style={styles.metaText}>{dueTime}</Text>
            </View>
          )}

          {category && (
            <View style={styles.metaItem}>
              <Ionicons
                name="folder-outline"
                size={16}
                color={COLORS.placeholder}
              />
              <Text style={styles.metaText}>{category}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    marginVertical: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },

  completed: {
    opacity: 0.6,
  },

  colorStrip: {
    width: 6,
    height: "100%",
  },

  checkZone: {
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  checkActive: {
    backgroundColor: COLORS.primary,
  },

  content: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 6,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  metaText: {
    color: COLORS.placeholder,
    fontSize: 13,
  },
});
