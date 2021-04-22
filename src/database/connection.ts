import * as SQLite from "expo-sqlite";

export const database = SQLite.openDatabase("database.db");
