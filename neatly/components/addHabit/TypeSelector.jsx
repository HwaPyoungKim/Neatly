import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export default function TypeSelector({ type, setType }) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.option, type === "habit" && styles.active]}
        onPress={() => setType("habit")}
      >
        <Text style={[styles.text, type === "habit" && styles.textActive]}>
          Habit
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, type === "task" && styles.active]}
        onPress={() => setType("task")}
      >
        <Text style={[styles.text, type === "task" && styles.textActive]}>
          Task
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "#EEE",
    borderRadius: 30,
    marginHorizontal: 20,
    padding: 4,
    marginBottom: 20,
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  active: {
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: 14,
    color: COLORS.placeholder,
  },
  textActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
