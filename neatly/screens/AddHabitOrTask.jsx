// AddHabitOrTask.jsx
import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, Alert } from "react-native";
import { COLORS } from "../theme/colors";
import { useSelector, useDispatch } from "react-redux";

import { useAddHabitMutation } from "../services/habitService";
import { useAddTaskMutation } from "../services/taskService";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
} from "../services/categoryService";

import { addHabitLocal } from "../app/store/slices/habitSlice";
import { addTaskLocal } from "../app/store/slices/taskSlice";

import { createHabitDb, createTaskDb, createCategoryDb } from "../app/database";

import HeaderBack from "../components/addHabit/HeaderBack";
import TypeSelector from "../components/addHabit/TypeSelector";
import TitleInputCard from "../components/addHabit/TitleInputCard";
import TargetSection from "../components/addHabit/TargetSection";
import RepeatSection from "../components/addHabit/RepeatSection";
import TimeOfDaySection from "../components/addHabit/TimeOfDaySection";
import TaskDateTime from "../components/addTask/TaskDateTime";
import TaskCategory from "../components/addTask/TaskCategory";
import TaskPriority from "../components/addTask/TaskPriority";
import CreateButton from "../components/addHabit/CreateButton";
import { addCategory } from "../app/store/slices/categorySlice";

export default function AddHabitOrTask({ navigation }) {
  const dispatch = useDispatch();

  const { localId, idToken } = useSelector((state) => state.auth.value);

  const { data: categories = [] } = useGetCategoriesQuery({ localId, idToken });

  const [addCategoryFirebase] = useAddCategoryMutation();
  const [addHabitFirebase] = useAddHabitMutation();
  const [addTaskFirebase] = useAddTaskMutation();

  const [type, setType] = useState("habit");
  const [title, setTitle] = useState("");

  const [targetEnabled, setTargetEnabled] = useState(false);
  const [targetValue, setTargetValue] = useState("30");
  const [repeatOption, setRepeatOption] = useState("Daily");
  const [repeatDays, setRepeatDays] = useState(4);
  const [selectedWeekDays, setSelectedWeekDays] = useState([]);
  const [timeOptionHabit, setTimeOptionHabit] = useState("Anytime");

  const [dueDate, setDueDate] = useState(new Date());
  const [dueTime, setDueTime] = useState(new Date());
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleCreateCategory = async (newCat) => {
    try {
      const saved = await createCategoryDb({
        userId: localId,
        label: newCat.label,
        icon: newCat.icon,
        color: newCat.color,
      });

      await addCategoryFirebase({
        localId,
        idToken,
        category: saved,
      });

      setCategory(saved.label);
      dispatch(addCategory(saved));
    } catch (err) {
      Alert.alert("Error", "No se pudo crear la categoría.");
    }
  };

  const handleCreateHabit = async () => {
    const habit = {
      id: Date.now().toString(),
      userId: localId,
      title,
      targetEnabled,
      targetValue: Number(targetValue),
      repeatOption,
      repeatDays,
      selectedWeekDays,
      timeOption: timeOptionHabit,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await createHabitDb(habit);
    await addHabitFirebase({ localId, idToken, habit });
    dispatch(addHabitLocal(habit));

    navigation.navigate("mainTabs");
  };

  const handleCreateTask = async () => {
    const task = {
      id: Date.now().toString(),
      userId: localId,
      title,
      dueDate: dueDate.toISOString().split("T")[0],
      dueTime: dueTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

      category,
      priority,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await createTaskDb(task);
    await addTaskFirebase({ localId, idToken, task });
    dispatch(addTaskLocal(task));

    navigation.navigate("mainTabs");
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <HeaderBack
        title={type === "habit" ? "Regular Habit" : "New Task"}
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
        <TypeSelector type={type} setType={setType} />
        <TitleInputCard type={type} title={title} setTitle={setTitle} />

        {type === "habit" && (
          <>
            <TargetSection
              targetEnabled={targetEnabled}
              toggleTarget={() => setTargetEnabled(!targetEnabled)}
              targetValue={targetValue}
              setTargetValue={setTargetValue}
            />

            <RepeatSection
              repeatOption={repeatOption}
              setRepeatOption={setRepeatOption}
              repeatDays={repeatDays}
              setRepeatDays={setRepeatDays}
              selectedWeekDays={selectedWeekDays}
              setSelectedWeekDays={setSelectedWeekDays}
            />

            <TimeOfDaySection
              timeOption={timeOptionHabit}
              setTimeOption={setTimeOptionHabit}
            />
          </>
        )}

        {type === "task" && (
          <>
            <TaskDateTime
              dueDate={dueDate}
              setDueDate={setDueDate}
              dueTime={dueTime}
              setDueTime={setDueTime}
            />

            <TaskCategory
              category={category}
              setCategory={setCategory}
              categories={categories}
              onCreateCategory={handleCreateCategory}
            />

            <TaskPriority priority={priority} setPriority={setPriority} />
          </>
        )}
      </ScrollView>

      <CreateButton
        onPress={type === "habit" ? handleCreateHabit : handleCreateTask}
      />
    </View>
  );
}
