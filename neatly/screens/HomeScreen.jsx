import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../app/store/slices/AuthSlice";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(setUser({ email: "" }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido!</Text>
      <Text style={styles.subtitle}>Estás en la Home</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#e63946",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
