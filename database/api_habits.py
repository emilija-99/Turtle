import sqlite3
from flask import Flask, jsonify

app = Flask(__name__)
def db_conn():
    conn = sqlite3.connect('habit_db.db')
    conn.row_factory = sqlite3.Row  
    return conn;

@app.route('/api/allHabits', methods=['GET'])
def getAllHabits():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute("SELECT * FROM HABIT_A")
    habitsAll = cur.fetchall()
    conn.close()

    habits_list = [dict(habit) for habit in habitsAll]

    return jsonify(habits_list)
if __name__ == '__main__':
    app.run(debug=True)
