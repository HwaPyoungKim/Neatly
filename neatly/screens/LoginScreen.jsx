import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../app/store/slices/AuthSlice";
import { COLORS } from "../theme/colors";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!email) {
      setEmailError("El email es requerido");
      valid = false;
    }

    if (!password) {
      setPasswordError("La contraseña es requerida");
      valid = false;
    }

    if (!valid) return;

    dispatch(setUser({ email }));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Bienvenido</Text>

        {/* EMAIL */}
        <TextInput
          style={[
            styles.inputUnderline,
            emailError && { borderColor: COLORS.error },
          ]}
          placeholder="Email"
          placeholderTextColor={COLORS.placeholder}
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
        <View style={styles.errorContainer}>
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        </View>

        {/* PASSWORD */}
        <TextInput
          style={[
            styles.inputUnderline,
            passwordError && { borderColor: COLORS.error },
          ]}
          placeholder="Password"
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <View style={styles.errorContainer}>
          {passwordError ? (
            <Text style={styles.error}>{passwordError}</Text>
          ) : null}
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("register")}>
          <Text style={styles.link}>Crear una cuenta</Text>
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
    minHeight: 18, // evita que se muevan los inputs
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
