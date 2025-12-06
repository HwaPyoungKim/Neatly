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

export default function HeaderBack({ title, onBack }) {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start(onBack);
  };

  return (
    <View style={styles.header}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity onPress={animate} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={COLORS.text} />
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={{ width: 28 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },

  backButton: {
    padding: 6,
    borderRadius: 20,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },
});
