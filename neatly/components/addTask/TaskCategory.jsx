import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";

const DEFAULT_CATEGORIES = [
  { id: "work", label: "Work", icon: "briefcase-outline", color: "#4A90E2" },
  {
    id: "personal",
    label: "Personal",
    icon: "person-circle-outline",
    color: "#9C27B0",
  },
  { id: "home", label: "Home", icon: "home-outline", color: "#FF7043" },
  { id: "study", label: "Study", icon: "book-outline", color: "#7CB342" },
  { id: "other", label: "Other", icon: "apps-outline", color: "#9E9E9E" },
];

const ICON_OPTIONS = [
  "briefcase-outline",
  "home-outline",
  "person-outline",
  "book-outline",
  "heart-outline",
  "star-outline",
];

const COLOR_OPTIONS = [
  "#4A90E2",
  "#9C27B0",
  "#FF7043",
  "#7CB342",
  "#E91E63",
  "#009688",
];

export default function TaskCategory({
  category,
  setCategory,
  categories = [],
  onCreateCategory,
  loading = false,
}) {
  const [addingNew, setAddingNew] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newColor, setNewColor] = useState(COLOR_OPTIONS[0]);
  const [newIcon, setNewIcon] = useState(ICON_OPTIONS[0]);

  const scale = new Animated.Value(1);

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
    ]).start();
  };

  const createCategory = () => {
    if (!newLabel.trim()) return;

    const payload = {
      label: newLabel.trim(),
      icon: newIcon,
      color: newColor,
    };

    onCreateCategory && onCreateCategory(payload);

    setNewLabel("");
    setNewColor(COLOR_OPTIONS[0]);
    setNewIcon(ICON_OPTIONS[0]);
    setAddingNew(false);
  };

  const list = categories;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Category</Text>

      <View style={styles.grid}>
        {list.map((cat) => {
          const key = cat.id || cat.label;
          const active = category === cat.label;

          return (
            <Animated.View
              key={key}
              style={{ transform: [{ scale: active ? scale : 1 }] }}
            >
              <TouchableOpacity
                style={[
                  styles.pill,
                  active && {
                    backgroundColor: cat.color || COLORS.primary,
                    shadowOpacity: 0.15,
                  },
                ]}
                onPress={() => {
                  animate();
                  setCategory(cat.label);
                  setAddingNew(false);
                }}
              >
                <Ionicons
                  name={cat.icon || "pricetag-outline"}
                  size={18}
                  color={active ? "#fff" : cat.color || COLORS.primary}
                  style={{ marginRight: 6 }}
                />
                <Text style={[styles.text, active && styles.textActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        <TouchableOpacity
          style={[styles.pill, styles.addNewPill]}
          onPress={() => setAddingNew(true)}
        >
          <Ionicons name="add" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {addingNew && (
        <View style={styles.newContainer}>
          <Text style={styles.newTitle}>New category</Text>

          <TextInput
            placeholder="Category name"
            placeholderTextColor="#999"
            style={styles.input}
            value={newLabel}
            onChangeText={setNewLabel}
          />

          <Text style={styles.subLabel}>Icon</Text>
          <View style={styles.iconRow}>
            {ICON_OPTIONS.map((icon) => {
              const active = icon === newIcon;
              return (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconCircle,
                    active && {
                      backgroundColor: COLORS.primary,
                    },
                  ]}
                  onPress={() => setNewIcon(icon)}
                >
                  <Ionicons
                    name={icon}
                    size={18}
                    color={active ? "#fff" : COLORS.text}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.subLabel, { marginTop: 10 }]}>Color</Text>
          <View style={styles.colorRow}>
            {COLOR_OPTIONS.map((c) => {
              const active = c === newColor;
              return (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.colorDot,
                    { backgroundColor: c },
                    active && styles.colorDotActive,
                  ]}
                  onPress={() => setNewColor(c)}
                />
              );
            })}
          </View>

          <TouchableOpacity
            style={[styles.createBtn, loading && { opacity: 0.6 }]}
            onPress={createCategory}
            disabled={loading}
          >
            <Text style={styles.createText}>
              {loading ? "Saving..." : "Create"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, marginBottom: 25 },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  addNewPill: {
    backgroundColor: "#E5F0FF",
  },
  text: { color: COLORS.text },
  textActive: { color: "#fff", fontWeight: "700" },

  newContainer: {
    marginTop: 14,
    padding: 12,
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
  },
  newTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  subLabel: {
    fontSize: 13,
    color: COLORS.placeholder,
    marginBottom: 6,
  },
  iconRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  colorRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  colorDotActive: {
    borderColor: "#000",
    borderWidth: 2,
  },
  createBtn: {
    marginTop: 12,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  createText: {
    color: "#fff",
    fontWeight: "600",
  },
});
