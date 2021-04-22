import { database } from "../database/connection";
import * as SQLite from "expo-sqlite";
import { Note } from "../models/note.model";

const table = 'notes';

export class NoteService {
  static createNote(note: Note) {
    if (!note.isValid()) return;
    const insert = `insert into ${table} (text, image, color) values(?, ?, ?)`;

    database.transaction(transaction => transaction.executeSql(insert, [note.text, note.image, note.color]))
  }

  static getNoteById(id: number) {
    const selectSQL = `select * from ${table} where id = ?`;
    const note = new Promise((resolve, _reject) => {
      database.transaction((transaction) =>
        transaction.executeSql(selectSQL, [id], (_, { rows }) => resolve(rows))
      );
    });

    return note;
  }

  static getAllNotes(
    orderBy: "asc" | "desc" = "asc"
  ): Promise<SQLite.SQLResultSetRowList> {
    const select = `select * from ${table} order by id ${orderBy}`;
    const notes: Promise<SQLite.SQLResultSetRowList> = new Promise(
      (resolve, _reject) => {
        database.transaction((transaction) =>
          transaction.executeSql(select, [], (_, { rows }) =>
            resolve(rows["_array"])
          )
        );
      }
    );

    return notes;
  }

  static updateNote(note: Note) {
    const updateSQL = `
      update ${table} 
      set text = ?, image = ?, color = ?
      where id = ?;
    `;

    database.transaction((transaction) =>
      transaction.executeSql(updateSQL, [
        note.text,
        note.image,
        note.color,
        note.id,
      ])
    );
  }

  static deleteNoteById(id: number) {
    const deleteSQL = `delete from ${table} where id = ?`;

    database.transaction((transaction) =>
      transaction.executeSql(deleteSQL, [id])
    );
  }

  static deleteAllNotes() {
    const deleteSQL = `delete from ${table}`;
    database.transaction((transaction) =>
      transaction.executeSql(deleteSQL)
    );
  }
}
