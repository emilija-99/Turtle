import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from datetime import datetime

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

def db_conn():
    conn = sqlite3.connect('habit_db.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/allHabits', methods=['GET'])
@cross_origin()
def getAllHabits():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute("SELECT * FROM habits")

    habitsAll = cur.fetchall()

    conn.close()

    habits_list = [dict(habit) for habit in habitsAll]
    return jsonify(habits_list)

@app.route('/api/createHabit', methods=['POST'])
@cross_origin()
def createNewHabit():
    conn = db_conn()
    new_habit = request.json

    if not new_habit or 'name' not in new_habit:
        return jsonify({"error": "Invalid request: /api/createHabit!."}), 400

    name = new_habit['name']
    date = datetime.now().strftime('%Y-%m-%d')

    cur = conn.cursor()
    cur.execute("INSERT INTO habits (habit_name, creation_date) VALUES (?, ?)", (name, date))
    conn.commit()

# get last created habit
    cur.execute("SELECT * FROM habits WHERE id = ?", (cur.lastrowid,))
    new_habit_data = cur.fetchone()
    conn.close()

    if new_habit_data:
        habit_dict = dict(zip([column[0] for column in cur.description], new_habit_data))
        return jsonify(habit_dict), 201 # success
    else:
        return jsonify({"error": "Habit not created."}), 500

@app.route('/api/progressHabitID/<int:id>', methods=['GET'])
@cross_origin()
def getProgressHabitData(id):
    conn = db_conn()
    cur = conn.cursor()

    cur.execute("""
        SELECT * FROM progress_habits
        WHERE habit_id = ?
    """, (id,))

    progress_data = cur.fetchall()
    conn.close()

    if progress_data:
        result = [
            {"id": row[0], "habit_id": row[1], "month_days": row[2], "list_checked": row[3]}
            for row in progress_data
        ]
        return jsonify(result), 200
    else:
        return jsonify({"message": "No progress found for this habit ID"}), 404

if __name__ == '__main__':
    app.run(debug=True)
