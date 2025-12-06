import { TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import { COLORS } from "../../theme/colors";
import { useRef } from "react";

export default function CreateButton({ onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = (cb) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.94,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start(cb);
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => animate(onPress)}
        activeOpacity={0.9}
      >
        <Text style={styles.text}>CREATE</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 60,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
