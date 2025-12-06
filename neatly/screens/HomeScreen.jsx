import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SectionList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";
import HabitCard from "../components/HabitCard"; // asegurate nombre correcto
import TaskCard from "../components/TaskCard";
import TabSelector from "../components/TabSelector";
import { COLORS } from "../theme/colors";

export default function HomeScreen({ navigation }) {
  const db = useSQLiteContext();

  const [activeTab, setActiveTab] = useState("habits");
  const [habits, setHabits] = useState([]);
  const [tasks, setTasks] = useState([]);

  const loadHabits = async () => {
    try {
      const res = await db.getAllAsync(`
        SELECT * FROM habits ORDER BY createdAt DESC;
      `);
      setHabits(res);
    } catch (err) {
      console.log("Error loading habits:", err);
    }
  };

  const loadTasks = async () => {
    try {
      const res = await db.getAllAsync(`
        SELECT * FROM tasks ORDER BY createdAt DESC;
      `);
      setTasks(res);
    } catch (err) {
      console.log("Error loading tasks:", err);
    }
  };

  const toggleHabit = async (id) => {
    try {
      await db.runAsync(
        `UPDATE habits 
         SET completed = CASE completed WHEN 1 THEN 0 ELSE 1 END 
         WHERE id = ?`,
        [id]
      );
      loadHabits();
    } catch (err) {
      console.log("toggleHabit error:", err);
    }
  };

  const toggleTask = async (id) => {
    try {
      await db.runAsync(
        `UPDATE tasks 
         SET completed = CASE completed WHEN 1 THEN 0 ELSE 1 END 
         WHERE id = ?`,
        [id]
      );
      loadTasks();
    } catch (err) {
      console.log("toggleTask error:", err);
    }
  };

  useEffect(() => {
    loadHabits();
    loadTasks();
  }, []);

  const habitSections = [
    { title: "Pending", data: habits.filter((h) => !h.completed) },
    { title: "Completed", data: habits.filter((h) => h.completed) },
  ];

  const taskSections = [
    { title: "Pending", data: tasks.filter((t) => !t.completed) },
    { title: "Completed", data: tasks.filter((t) => t.completed) },
  ];

  const handleAdd = () => navigation.navigate("addHabitOrTask");

  const sectionEmptyMessage = (title) =>
    title === "Pending" ? "Nothing pending yet." : "No items completed yet.";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Neatly</Text>

        <TabSelector
          tabs={["habits", "tasks"]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <SectionList
          sections={activeTab === "habits" ? habitSections : taskSections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section: { title, data } }) => (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sectionHeader}>{title}</Text>

              {data.length === 0 && (
                <Text style={styles.emptyText}>
                  {sectionEmptyMessage(title)}
                </Text>
              )}
            </View>
          )}
          renderItem={({ item }) =>
            activeTab === "habits" ? (
              <HabitCard
                completed={item.completed}
                onToggle={() => toggleHabit(item.id)}
                title={item.title}
                progressText={
                  item.targetEnabled ? `${item.targetValue} units` : null
                }
              />
            ) : (
              <TaskCard
                title={item.title}
                completed={item.completed}
                dueDate={item.dueDate}
                dueTime={item.dueTime}
                category={item.category}
                priority={item.priority}
                onToggle={() => toggleTask(item.id)}
              />
            )
          }
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />

        <TouchableOpacity style={styles.fab} onPress={handleAdd}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 16,
    color: COLORS.text,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 6,
  },
  emptyText: {
    marginLeft: 4,
    color: COLORS.placeholder,
    fontSize: 14,
    marginBottom: 10,
  },
  fab: {
    position: "absolute",
    bottom: 80,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 32,
    marginTop: -2,
  },
});
