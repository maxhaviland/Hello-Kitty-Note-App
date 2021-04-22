import { database } from "./connection";

export class Database {
  constructor() {
    database.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
      console.log("Foreign keys turned on")
    );
    this.initDatabase();
  }

  private initDatabase() {
    const sqlList = [
      `create table if not exists notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        text TEXT, 
        image TEXT, 
        color TEXT
      );`,
    ];

    database.transaction((transaction) => {
      sqlList.map((sql) => transaction.executeSql(sql));
    });
  }
}
