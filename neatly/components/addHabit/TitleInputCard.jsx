import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";

export default function TitleInputCard({ type, title, setTitle }) {
  return (
    <View style={styles.card}>
      <View style={styles.labelRow}>
        <Ionicons name="create-outline" size={20} color={COLORS.placeholder} />
        <Text style={styles.label}>Title</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder={type === "habit" ? "Read a book" : "Buy groceries"}
        placeholderTextColor={COLORS.placeholder}
        value={title}
        onChangeText={setTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.07,
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
    fontSize: 14,
    color: COLORS.placeholder,
  },

  input: {
    fontSize: 17,
    color: COLORS.text,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    paddingVertical: 6,
  },
});
