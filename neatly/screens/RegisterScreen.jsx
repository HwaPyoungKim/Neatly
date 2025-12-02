import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS } from "../theme/colors";

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState({});

  const handleRegister = () => {
    let newErr = {};
    let valid = true;

    if (!form.name) {
      newErr.name = "Nombre requerido";
      valid = false;
    }
    if (!form.email) {
      newErr.email = "Email requerido";
      valid = false;
    }
    if (!form.password) {
      newErr.password = "Contraseña requerida";
      valid = false;
    }
    if (form.password !== form.confirmPassword) {
      newErr.confirmPassword = "Las contraseñas no coinciden";
      valid = false;
    }

    setErr(newErr);
    if (!valid) return;

    navigation.navigate("login");
  };

  const set = (field, value) => setForm({ ...form, [field]: value });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Crear cuenta</Text>

        <TextInput
          style={[
            styles.inputUnderline,
            err.name && { borderColor: COLORS.error },
          ]}
          placeholder="Nombre"
          placeholderTextColor={COLORS.placeholder}
          onChangeText={(t) => set("name", t)}
        />
        <View style={styles.errorContainer}>
          {err.name && <Text style={styles.error}>{err.name}</Text>}
        </View>

        <TextInput
          style={[
            styles.inputUnderline,
            err.email && { borderColor: COLORS.error },
          ]}
          placeholder="Email"
          placeholderTextColor={COLORS.placeholder}
          autoCapitalize="none"
          onChangeText={(t) => set("email", t)}
        />
        <View style={styles.errorContainer}>
          {err.email && <Text style={styles.error}>{err.email}</Text>}
        </View>

        <TextInput
          style={[
            styles.inputUnderline,
            err.password && { borderColor: COLORS.error },
          ]}
          placeholder="Password"
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry
          onChangeText={(t) => set("password", t)}
        />
        <View style={styles.errorContainer}>
          {err.password && <Text style={styles.error}>{err.password}</Text>}
        </View>

        <TextInput
          style={[
            styles.inputUnderline,
            err.confirmPassword && { borderColor: COLORS.error },
          ]}
          placeholder="Confirm Password"
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry
          onChangeText={(t) => set("confirmPassword", t)}
        />
        <View style={styles.errorContainer}>
          {err.confirmPassword && (
            <Text style={styles.error}>{err.confirmPassword}</Text>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarme</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={styles.link}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 32,
    textAlign: "center",
    color: COLORS.text,
  },
  inputUnderline: {
    width: "100%",
    borderBottomWidth: 2,
    borderColor: COLORS.underline,
    paddingVertical: 8,
    marginBottom: 6,
    fontSize: 16,
    color: COLORS.text,
  },
  errorContainer: {
    minHeight: 18,
  },
  error: {
    color: COLORS.error,
    fontSize: 13,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 25,
    width: "100%",
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 18,
    textAlign: "center",
  },
  link: {
    marginTop: 12,
    color: COLORS.placeholder,
    fontSize: 15,
  },
});
