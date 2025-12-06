import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export default function HabitCard({
  completed = false,
  onToggle = () => {},
  icon,
  title,
  subtitle,
  progressText,
}) {
  const isCompleted = !!completed;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.checkCircle,
          completed && { backgroundColor: COLORS.primary },
        ]}
        onPress={onToggle}
      >
        {isCompleted && <View style={styles.innerDot} />}
      </TouchableOpacity>

      <View style={styles.card}>
        {icon && <Image source={icon} style={styles.icon} />}

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        {progressText && <Text style={styles.progress}>{progressText}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  checkCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  innerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,

    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  icon: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 12,
    color: COLORS.placeholder,
    marginTop: 1,
  },

  progress: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
    marginLeft: 8,
  },
});
