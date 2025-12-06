import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";
import { useRef } from "react";

export default function RepeatSection({
  repeatOption,
  setRepeatOption,
  repeatDays,
  setRepeatDays,
  selectedWeekDays,
  setSelectedWeekDays,
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const repeatOptions = [
    { label: "Daily", icon: "refresh-outline" },
    { label: "Weekly", icon: "calendar-outline" },
    { label: "Every X days", icon: "timer-outline" },
  ];

  const weekDays = [
    { label: "Mon", id: 1 },
    { label: "Tue", id: 2 },
    { label: "Wed", id: 3 },
    { label: "Thu", id: 4 },
    { label: "Fri", id: 5 },
    { label: "Sat", id: 6 },
    { label: "Sun", id: 7 },
  ];

  const pressAnim = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleWeekDay = (id) => {
    if (selectedWeekDays.includes(id)) {
      setSelectedWeekDays(selectedWeekDays.filter((d) => d !== id));
    } else {
      setSelectedWeekDays([...selectedWeekDays, id]);
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Repeat habit</Text>

      <View style={styles.grid}>
        {repeatOptions.map((opt) => {
          const active = repeatOption === opt.label;

          return (
            <Animated.View
              key={opt.label}
              style={{ transform: [{ scale: active ? scale : 1 }] }}
            >
              <TouchableOpacity
                style={[styles.pill, active && styles.activePill]}
                onPress={() => {
                  pressAnim();
                  setRepeatOption(opt.label);
                }}
              >
                <Ionicons
                  name={opt.icon}
                  size={18}
                  color={active ? "#fff" : COLORS.primary}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[styles.pillText, active && styles.activePillText]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {repeatOption === "Daily" && null}
      {repeatOption === "Weekly" && (
        <>
          <Text style={styles.daysLabel}>{repeatDays} days per week</Text>

          <Slider
            style={{ width: "100%" }}
            minimumValue={1}
            maximumValue={7}
            step={1}
            minimumTrackTintColor={COLORS.primary}
            thumbTintColor={COLORS.primary}
            value={repeatDays}
            onValueChange={setRepeatDays}
          />
        </>
      )}

      {repeatOption === "Every X days" && (
        <>
          <Text style={styles.daysLabel}>Select days</Text>

          <View style={styles.weekGrid}>
            {weekDays.map((d) => {
              const active = selectedWeekDays.includes(d.id);

              return (
                <TouchableOpacity
                  key={d.id}
                  style={[
                    styles.dayPill,
                    active && { backgroundColor: COLORS.primary },
                  ]}
                  onPress={() => toggleWeekDay(d.id)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      active && { color: "#fff", fontWeight: "700" },
                    ]}
                  >
                    {d.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
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
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },

  activePill: { backgroundColor: COLORS.primary },

  pillText: { color: COLORS.text },

  activePillText: { color: "#fff", fontWeight: "600" },

  daysLabel: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 8,
  },

  weekGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 6,
  },

  dayPill: {
    backgroundColor: "#EEE",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
  },

  dayText: {
    fontSize: 14,
    color: COLORS.text,
  },
});
