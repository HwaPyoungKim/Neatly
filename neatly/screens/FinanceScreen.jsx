import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";
import { useSelector } from "react-redux";
import { getFinanceSummary } from "../app/database";

export default function FinanceScreen() {
  const localId = useSelector((state) => state.auth.value.localId);

  const [summary, setSummary] = useState({
    ingresos: 0,
    egresos: 0,
    balance: 0,
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await getFinanceSummary(localId);
        setSummary(data);
      } catch (e) {
        console.log("Error cargando resumen financiero", e);
      }
    }
    if (localId) load();
  }, [localId]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Finance</Text>
        <Text style={styles.subtitle}>Tu resumen financiero</Text>

        <View style={styles.cardRow}>
          <View style={[styles.card, styles.incomeCard]}>
            <Text style={styles.cardLabel}>Ingresos</Text>
            <Text style={styles.cardValue}>$ {summary.ingresos}</Text>
          </View>

          <View style={[styles.card, styles.expenseCard]}>
            <Text style={styles.cardLabel}>Egresos</Text>
            <Text style={styles.cardValue}>$ {summary.egresos}</Text>
          </View>
        </View>

        <View style={styles.cardBalance}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text
            style={[
              styles.balanceValue,
              { color: summary.balance >= 0 ? "#1AA35E" : "#D64545" },
            ]}
          >
            $ {summary.balance}
          </Text>
        </View>

        <Text style={styles.smallHint}>
          (Los datos vienen de tu tabla{" "}
          <Text style={{ fontWeight: "700" }}>finance</Text> en SQLite)
        </Text>
      </View>
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
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.placeholder,
    marginTop: 4,
    marginBottom: 20,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  incomeCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#1AA35E",
  },
  expenseCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#D64545",
  },
  cardLabel: {
    fontSize: 14,
    color: COLORS.placeholder,
  },
  cardValue: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  cardBalance: {
    marginTop: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 15,
    color: COLORS.placeholder,
  },
  balanceValue: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "700",
  },

  smallHint: {
    marginTop: 16,
    fontSize: 12,
    color: COLORS.placeholder,
  },
});
