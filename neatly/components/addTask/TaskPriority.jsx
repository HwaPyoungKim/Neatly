import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { COLORS } from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";

export default function TaskPriority({ priority, setPriority }) {
  const options = [
    { label: "Low", color: "#4CAF50", icon: "arrow-down-circle-outline" },
    { label: "Medium", color: "#FFC107", icon: "remove-circle-outline" },
    { label: "High", color: "#F44336", icon: "arrow-up-circle-outline" },
  ];

  const scale = useRef(new Animated.Value(1)).current;

  const animate = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.96,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Priority</Text>

      <View style={styles.grid}>
        {options.map((opt) => {
          const active = priority === opt.label;

          return (
            <Animated.View
              key={opt.label}
              style={{ transform: [{ scale: scale }] }}
            >
              <TouchableOpacity
                style={[styles.pill, active && { backgroundColor: opt.color }]}
                onPress={() => {
                  animate();
                  setPriority(opt.label);
                }}
              >
                <Ionicons
                  name={opt.icon}
                  size={20}
                  color={active ? "#fff" : opt.color}
                  style={{ marginRight: 6 }}
                />
                <Text style={[styles.text, active && styles.textActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    gap: 10,
  },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  text: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "500",
  },

  textActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
