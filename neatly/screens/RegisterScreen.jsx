import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";
import { useRegisterMutation } from "../services/authService";

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [triggerRegister, result] = useRegisterMutation();

  const onSubmit = () => {
    triggerRegister({
      email: form.email,
      password: form.password,
    });
  };

  const [err, setErr] = useState({});

  const set = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
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

    try {
      const res = await triggerRegister({
        email: form.email,
        password: form.password,
        name: form.name,
      }).unwrap();
      console.log("Register OK", res);

      navigation.navigate("login");
    } catch (error) {
      console.log("Register error:", error);

      if (error?.data?.message) {
        setErr((prev) => ({ ...prev, email: error.data.message }));
      }
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          <Text style={styles.appName}>Neatly</Text>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>
            Empezá a reconstruir tu vida con hábitos y tareas claras.
          </Text>

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
            keyboardType="email-address"
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  content: {
    marginTop: 40,
  },
  appName: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.placeholder,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.placeholder,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 28,
  },
  inputUnderline: {
    borderBottomWidth: 2,
    borderColor: COLORS.underline,
    paddingVertical: 8,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  errorContainer: {
    minHeight: 18,
    marginBottom: 6,
  },
  error: {
    color: COLORS.error,
    fontSize: 12,
  },
  footer: {
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: "600",
  },
  link: {
    marginTop: 14,
    textAlign: "center",
    color: COLORS.placeholder,
    fontSize: 14,
  },
});
