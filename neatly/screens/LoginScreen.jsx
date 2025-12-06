import React, { useEffectEvent, useState } from "react";
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
import { useDispatch } from "react-redux";
import { setUser } from "../app/store/slices/authSlice";
import { useLoginMutation } from "../services/authService";
import { COLORS } from "../theme/colors";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { DEFAULT_CATEGORIES } from "../app/defaultCategories";
import { createCategoryDb } from "../app/database";
import { useAddCategoryMutation } from "../services/categoryService";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [triggerLogin, result] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const db = useSQLiteContext();

  const [addCategoryFirebase] = useAddCategoryMutation();

  useEffect(() => {
    async function setup() {
      const result = await db.getFirstAsync("SELECT * FROM users");
      if (result) {
        dispatch(
          setUser({
            email: result.email,
            localId: result.localId,
          })
        );
      }
    }
  }, []);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    backend: "",
  });

  const ensureDefaultCategories = async (localId, idToken) => {
    const existing = await fetch(
      `https://neatly-c2182-default-rtdb.firebaseio.com/users/${localId}/categories.json?auth=${idToken}`
    ).then((r) => r.json());

    if (existing !== null) return;

    for (let cat of DEFAULT_CATEGORIES) {
      const saved = await createCategoryDb({
        userId: localId,
        label: cat.label,
        icon: cat.icon,
        color: cat.color,
      });

      await addCategoryFirebase({
        localId,
        idToken,
        category: saved,
      });
    }
  };

  const saveUserInDb = async (email, localId) => {
    try {
      const result = await db.runAsync(
        `INSERT INTO sessions (email, localId) VALUES (?, ?);`,
        email,
        localId
      );
      console.log("Usuario guardado en SQLite:", email);
    } catch (error) {
      console.error("❌ Error guardando usuario en SQLite:", error);
      throw error;
    }
  };

  const handleLogin = async () => {
    setErrors({ email: "", password: "", backend: "" });

    let newErrors = {};
    let valid = true;

    if (!email) {
      newErrors.email = "El email es requerido";
      valid = false;
    }
    if (!password) {
      newErrors.password = "La contraseña es requerida";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      const res = await triggerLogin({
        email,
        password,
        returnSecureToken: true,
      }).unwrap();

      dispatch(
        setUser({
          email: res.email,
          idToken: res.idToken,
          refreshToken: res.refreshToken,
          localId: res.localId,
        })
      );
      await saveUserInDb(res.email, res.localId);

      await ensureDefaultCategories(res.localId, res.idToken);
    } catch (error) {
      console.log("Login error:", error);

      const msg = error?.data?.error?.message;

      if (msg === "INVALID_PASSWORD") {
        return setErrors((prev) => ({
          ...prev,
          password: "La contraseña es incorrecta",
        }));
      }

      if (msg === "EMAIL_NOT_FOUND") {
        return setErrors((prev) => ({
          ...prev,
          email: "El email no está registrado",
        }));
      }

      if (msg === "INVALID_EMAIL") {
        return setErrors((prev) => ({
          ...prev,
          email: "Formato de email inválido",
        }));
      }

      if (msg === "USER_DISABLED") {
        return setErrors((prev) => ({
          ...prev,
          backend: "Esta cuenta fue deshabilitada",
        }));
      }

      if (msg === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        return setErrors((prev) => ({
          ...prev,
          backend: "Demasiados intentos. Intente más tarde.",
        }));
      }

      setErrors((prev) => ({
        ...prev,
        backend: "Error al iniciar sesión",
      }));
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
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>
            Inicia sesión para seguir organizando tu vida.
          </Text>

          {errors.backend ? (
            <Text style={styles.backendError}>{errors.backend}</Text>
          ) : null}

          <View style={styles.inputGroup}>
            <TextInput
              style={[
                styles.inputUnderline,
                errors.email && { borderColor: COLORS.error },
              ]}
              placeholder="Email"
              placeholderTextColor={COLORS.placeholder}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.errorContainer}>
              {!!errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={[
                styles.inputUnderline,
                errors.password && { borderColor: COLORS.error },
              ]}
              placeholder="Password"
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <View style={styles.errorContainer}>
              {!!errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, result.isLoading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={result.isLoading}
          >
            <Text style={styles.buttonText}>
              {result.isLoading ? "Ingresando..." : "Ingresar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("register")}>
            <Text style={styles.linkText}>Crear una cuenta</Text>
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
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.placeholder,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 32,
  },
  backendError: {
    color: COLORS.error,
    textAlign: "center",
    marginBottom: 16,
    fontSize: 14,
    fontWeight: "500",
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputUnderline: {
    borderBottomWidth: 2,
    borderColor: COLORS.underline,
    paddingVertical: 8,
    fontSize: 16,
    color: COLORS.text,
  },
  errorContainer: {
    minHeight: 18,
    marginTop: 2,
  },
  errorText: {
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
  linkText: {
    marginTop: 14,
    textAlign: "center",
    color: COLORS.placeholder,
    fontSize: 14,
  },
});
