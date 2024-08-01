

import sqlite3
conn = sqlite3.connect('habit_db.db');

cur = conn.cursor();

# habit table
# - habit_id
# - habit_name
# - creation date
cur.execute("""
    CREATE TABLE IF NOT EXISTS HABIT_A(
    habit_id int PRIMARY KEY,
    habit_name text,
    creation_date text)
""");

cur.execute("INSERT INTO HABIT_A VALUES ('x001','habit_demo','01.08.1999.')");
cur.execute("INSERT INTO HABIT_A VALUES ('x002','habit_demo','01.08.1999.')")
cur.execute("INSERT INTO HABIT_A VALUES ('x003','habit_demo','01.08.1999.')")
cur.execute("INSERT INTO HABIT_A VALUES ('x004','habit_demo','01.08.1999.')")
cur.execute("INSERT INTO HABIT_A VALUES ('x005','habit_demo','01.08.1999.')")

conn.commit();
conn.close();