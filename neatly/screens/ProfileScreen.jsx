import React, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../theme/colors";
import { clearUser } from "../app/store/slices/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import * as ImagePicker from "expo-image-picker";
import { setProfilePicture } from "../app/store/slices/userSlice";
import { useIsFocused } from "@react-navigation/native";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const db = useSQLiteContext();

  const email = useSelector((state) => state.auth.value.email);
  const localId = useSelector((state) => state.auth.value.localId);
  const image = useSelector((state) => state.user.value.profilePicture);

  const displayName = email?.split("@")[0] || "Usuario";
  const isFocused = useIsFocused();

  const getAllHabits = async (localId) => {
    try {
      return await db.getAllAsync(
        `SELECT * FROM habits WHERE userId = ? ORDER BY createdAt DESC;`,
        [localId]
      );
    } catch (error) {
      console.log("Error getAllHabits:", error);
      return [];
    }
  };

  const getAllTasks = async (localId) => {
    try {
      return await db.getAllAsync(
        `SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC;`,
        [localId]
      );
    } catch (error) {
      console.log("Error getAllTasks:", error);
      return [];
    }
  };

  const getCompletedCount = async (localId) => {
    try {
      const habits = await db.getAllAsync(
        `SELECT id FROM habits WHERE userId = ? AND completed = 1;`,
        [localId]
      );
      const tasks = await db.getAllAsync(
        `SELECT id FROM tasks WHERE userId = ? AND completed = 1;`,
        [localId]
      );
      return habits.length + tasks.length;
    } catch (error) {
      console.log("Error getCompletedCount:", error);
      return 0;
    }
  };

  const [habitCount, setHabitCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    async function loadStats() {
      if (!db || !localId) return;

      try {
        const habitsResult = await db.getAllAsync(
          `SELECT count(*) as total FROM habits WHERE userId = ?`,
          [localId]
        );
        const totalHabits = habitsResult[0]?.total || 0;

        const tasksResult = await db.getAllAsync(
          `SELECT count(*) as total FROM tasks WHERE userId = ?`,
          [localId]
        );
        const totalTasks = tasksResult[0]?.total || 0;

        const habitsCompleted = await db.getAllAsync(
          `SELECT count(*) as total FROM habits WHERE userId = ? AND completed = 1`,
          [localId]
        );
        const tasksCompleted = await db.getAllAsync(
          `SELECT count(*) as total FROM tasks WHERE userId = ? AND completed = 1`,
          [localId]
        );

        const totalCompleted =
          (habitsCompleted[0]?.total || 0) + (tasksCompleted[0]?.total || 0);

        setHabitCount(totalHabits);
        setTaskCount(totalTasks);
        setCompletedCount(totalCompleted);
      } catch (e) {
        console.log("Error cargando stats perfil:", e);
      }
    }

    if (isFocused) {
      loadStats();
    }
  }, [isFocused, localId, db]);

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.6,
    });

    if (!result.canceled) {
      dispatch(
        setProfilePicture("data:image/jpeg;base64," + result.assets[0].base64)
      );
    }
  };

  const handleLogout = async () => {
    try {
      await db.runAsync("DELETE FROM sessions WHERE localId = ?;", [localId]);
    } catch (e) {
      console.log("Error limpiando sessions", e);
    }
    dispatch(clearUser());
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.title}>Mi Perfil</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: image
                  ? image
                  : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${displayName}`,
              }}
              style={styles.avatar}
            />

            <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
              <Ionicons name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{habitCount}</Text>
            <Text style={styles.statLabel}>Habits</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{taskCount}</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 20,
  },

  profileCard: {
    alignItems: "center",
    marginTop: 20,
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#ddd",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  email: {
    fontSize: 14,
    color: COLORS.placeholder,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  statBox: {
    backgroundColor: "#fff",
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.placeholder,
    marginTop: 4,
  },

  logoutButton: {
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: "#FF5A5F20",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#D64545",
    fontWeight: "600",
  },
});
