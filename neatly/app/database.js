import * as SQLite from "expo-sqlite";

let db = null;

export const initDatabase = async (databaseInstance) => {
  try {
    db = databaseInstance;
    await db.execAsync("PRAGMA foreign_keys = ON;");

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY NOT NULL,
        email TEXT NOT NULL,
        localId TEXT NOT NULL
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        label TEXT NOT NULL,
        icon TEXT,
        color TEXT,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL,
        isDirty INTEGER DEFAULT 1,
        needsSync INTEGER DEFAULT 1
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS habits (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        title TEXT NOT NULL,
        targetEnabled INTEGER,
        targetValue INTEGER,
        repeatOption TEXT,
        repeatDays INTEGER,
        selectedWeekDays TEXT,
        timeOption TEXT,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL,
        completed INTEGER DEFAULT 0,
        isDirty INTEGER DEFAULT 1,
        needsSync INTEGER DEFAULT 1
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        title TEXT NOT NULL,
        dueDate TEXT,
        dueTime TEXT,
        category TEXT,
        priority TEXT,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL,
        completed INTEGER DEFAULT 0,
        isDirty INTEGER DEFAULT 1,
        needsSync INTEGER DEFAULT 1
      );
    `);

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS finance (
      id TEXT PRIMARY KEY,
      userId TEXT,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      description TEXT,
      createdAt INTEGER NOT NULL
    );

    `);

    console.log("📦 SQLite inicializado correctamente.");
    return db;
  } catch (error) {
    console.error("❌ Error inicializando SQLite:", error);
    throw error;
  }
};

export const getDatabase = () => {
  if (!db) {
    throw new Error(
      "Base de datos no inicializada. Llamá a initDatabase() primero."
    );
  }
  return db;
};

export const runQuery = async (sql, params = []) => {
  try {
    const db = getDatabase();
    return await db.runAsync(sql, params);
  } catch (error) {
    console.error("❌ Error en runQuery:", error);
    throw error;
  }
};

export const getAll = async (sql, params = []) => {
  try {
    const db = getDatabase();
    return await db.getAllAsync(sql, params);
  } catch (error) {
    console.error("❌ Error en getAll:", error);
    throw error;
  }
};

export const createCategoryDb = async ({ userId, label, icon, color }) => {
  const db = getDatabase();

  const result = await db.runAsync(
    `INSERT INTO categories (userId, label, icon, color, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, label, icon, color, Date.now(), Date.now()]
  );

  const newId = result.lastInsertRowId;

  return {
    id: newId,
    userId,
    label,
    icon,
    color,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};

export const createHabitDb = async (habit) => {
  return await db.runAsync(
    `INSERT INTO habits (
      id, userId, title, repeatOption, repeatDays, selectedWeekDays,
      timeOption, targetEnabled, targetValue, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      habit.id,
      habit.userId,
      habit.title,
      habit.repeatOption,
      habit.repeatDays,
      JSON.stringify(habit.selectedWeekDays),
      habit.timeOption,
      habit.targetEnabled ? 1 : 0,
      habit.targetValue,
      habit.createdAt,
      habit.updatedAt,
    ]
  );
};

export const createTaskDb = async (task) => {
  return await db.runAsync(
    `INSERT INTO tasks (
      id, userId, title, dueDate, dueTime, category, priority,
      createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      task.id,
      task.userId,
      task.title,
      task.dueDate,
      task.dueTime,
      task.category,
      task.priority,
      task.createdAt,
      task.updatedAt,
    ]
  );
};

export const addFinanceDb = async (entry) => {
  return await db.runAsync(
    `INSERT INTO finance (id, userId, type, amount, description, createdAt)
     VALUES (?, ?, ?, ?, ?, ?);`,
    [
      entry.id,
      entry.userId,
      entry.type,
      entry.amount,
      entry.description,
      entry.createdAt,
    ]
  );
};

export const getFinanceSummary = async (userId) => {
  const db = await getDatabase();

  const ingresos = await db.getFirstAsync(
    "SELECT SUM(amount) AS total FROM finance WHERE userId = ? AND type = 'income';",
    [userId]
  );

  const egresos = await db.getFirstAsync(
    "SELECT SUM(amount) AS total FROM finance WHERE userId = ? AND type = 'expense';",
    [userId]
  );

  return {
    ingresos: ingresos?.total || 0,
    egresos: egresos?.total || 0,
    balance: (ingresos?.total || 0) - (egresos?.total || 0),
  };
};

export const getOne = async (sql, params = []) => {
  try {
    const db = getDatabase();
    return await db.getFirstAsync(sql, params);
  } catch (error) {
    console.error("❌ Error en getOne:", error);
    throw error;
  }
};
