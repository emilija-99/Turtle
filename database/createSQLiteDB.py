

import sqlite3
from datetime import datetime

conn = sqlite3.connect('habit_db.db');

cur = conn.cursor();

# habit table
# - id - unique key for habit
# - habit_name - can be duplicated
# - creation date - can be duplicated
cur.execute("""
    CREATE TABLE IF NOT EXISTS habits(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habit_name TEXT,
    creation_date TEXT)
""");

# progress of habit
# - habit_id - references to habit table
# - month_days - use creation date (months) to create visual board with unchecked/chekced list
# - list_checked - remember a list of the habit checked progress
cur.execute("""
    CREATE TABLE IF NOT EXISTS progress_habits(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            habit_id INTEGER,
            month_days INTEGER,
            list_checked TEXT,
            FOREIGN KEY (habit_id) REFERENCES habits(id)
        )
""")

cur.execute("CREATE INDEX IF NOT EXISTS idx_habit_name ON habits(habit_name);")
conn.commit();

def add_habit_and_progress(habit_name, creation_date):
    conn = sqlite3.connect('habit_db.db')
    cur = conn.cursor()

    cursor_used = cur.execute("""
        INSERT INTO habits (habit_name, creation_date)
        VALUES (?, ?)
    """, (habit_name, creation_date))

    habit_id = cursor_used.lastrowid
    month_days = datetime.strptime(creation_date,'%Y-%m-%d').month;
    print(month_days)


    # Insert into progress_habits
    cur.execute("""
        INSERT INTO progress_habits (habit_id, month_days, list_checked)
        VALUES (?, ?, ?)
    """, (habit_id, month_days, '')) 

    conn.commit()
    conn.close()

add_habit_and_progress('test', '2024-09-30')


