import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";
import { useRef } from "react";

export default function TimeOfDaySection({ timeOption, setTimeOption }) {
  const options = [
    { label: "Anytime", icon: "sunny-outline" },
    { label: "Morning", icon: "partly-sunny-outline" },
    { label: "Afternoon", icon: "cloudy-outline" },
    { label: "Evening", icon: "moon-outline" },
  ];

  const scale = useRef(new Animated.Value(1)).current;

  const animate = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.96,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Time of day</Text>

      <View style={styles.grid}>
        {options.map((opt) => {
          const active = timeOption === opt.label;

          return (
            <Animated.View
              key={opt.label}
              style={{ transform: [{ scale: active ? scale : 1 }] }}
            >
              <TouchableOpacity
                style={[styles.pill, active && styles.activePill]}
                onPress={() => {
                  animate();
                  setTimeOption(opt.label);
                }}
              >
                <Ionicons
                  name={opt.icon}
                  size={18}
                  color={active ? "#fff" : COLORS.primary}
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
  section: { paddingHorizontal: 20, marginBottom: 25 },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 10,
    rowGap: 10,
  },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  activePill: { backgroundColor: COLORS.primary },

  text: { fontSize: 14, color: COLORS.text },

  activeText: { color: "#fff", fontWeight: "600" },
});
