import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function TaskDateTime({
  dueDate,
  setDueDate,
  dueTime,
  setDueTime,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatDate = (date) =>
    date ? date.toLocaleDateString() : "Select date";

  const formatTime = (time) =>
    time
      ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "Select time";

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Due date & time</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => setShowDatePicker(true)}
        >
          <View style={styles.labelRow}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={COLORS.placeholder}
            />
            <Text style={styles.label}>Due Date</Text>
          </View>

          <Text
            style={[styles.value, !dueDate && { color: COLORS.placeholder }]}
          >
            {formatDate(dueDate)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => setShowTimePicker(true)}
        >
          <View style={styles.labelRow}>
            <Ionicons
              name="time-outline"
              size={20}
              color={COLORS.placeholder}
            />
            <Text style={styles.label}>Due Time</Text>
          </View>

          <Text
            style={[styles.value, !dueTime && { color: COLORS.placeholder }]}
          >
            {formatTime(dueTime)}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={dueDate || new Date()}
          onChange={(event, selected) => {
            setShowDatePicker(false);
            if (selected) setDueDate(selected);
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={dueTime || new Date()}
          onChange={(event, selected) => {
            setShowTimePicker(false);
            if (selected) setDueTime(selected);
          }}
        />
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

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },

  label: {
    color: COLORS.placeholder,
    fontSize: 13,
  },

  value: {
    color: COLORS.text,
    fontSize: 16,
    marginTop: 2,
    fontWeight: "500",
  },
});
