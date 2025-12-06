import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";
import { useRef } from "react";

export default function TargetSection({
  targetEnabled,
  toggleTarget,
  targetValue,
  setTargetValue,
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  if (targetEnabled) fadeIn();

  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Ionicons name="flag-outline" size={20} color={COLORS.primary} />
          <Text style={styles.title}>Set your target</Text>
        </View>

        <TouchableOpacity onPress={toggleTarget}>
          <View style={[styles.toggle, targetEnabled && styles.toggleActive]}>
            <View
              style={[
                styles.toggleCircle,
                targetEnabled && styles.toggleCircleActive,
              ]}
            />
          </View>
        </TouchableOpacity>
      </View>

      {targetEnabled && (
        <Animated.View style={[styles.targetRow, { opacity: fadeAnim }]}>
          <TextInput
            style={styles.targetInput}
            keyboardType="numeric"
            value={targetValue}
            onChangeText={setTargetValue}
          />
          <Text style={styles.unit}>mins</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, marginBottom: 25 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  title: { fontSize: 16, fontWeight: "600", color: COLORS.text },

  toggle: {
    width: 45,
    height: 26,
    borderRadius: 15,
    backgroundColor: "#DDD",
    padding: 3,
    justifyContent: "center",
  },

  toggleActive: { backgroundColor: COLORS.primary },

  toggleCircle: {
    width: 20,
    height: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  toggleCircleActive: { alignSelf: "flex-end" },

  targetRow: { flexDirection: "row", alignItems: "center" },

  targetInput: {
    width: 70,
    borderBottomWidth: 1,
    borderColor: "#DDD",
    fontSize: 18,
    marginRight: 10,
    color: COLORS.text,
  },

  unit: { fontSize: 16, color: COLORS.placeholder },
});
