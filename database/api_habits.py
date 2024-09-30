import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app)
def db_conn():
    conn = sqlite3.connect('habit_db.db')
    conn.row_factory = sqlite3.Row  
    return conn;

@app.route('/api/allHabits', methods=['GET'])
@cross_origin()
def getAllHabits():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute("SELECT * FROM habits")
    habitsAll = cur.fetchall()
    conn.close()

    habits_list = [dict(habit) for habit in habitsAll]

    return jsonify(habits_list);


@app.route('/api/createHabit', methods=['POST'])
@cross_origin()
def createNewHabit():
    conn = db_conn()
    new_habit = request.json

    name = new_habit['name']
    date =  date();
    cur = conn.cursor()

    cur.execute("SELECT * FROM habits")
    habitsAll = cur.fetchall()
    conn.close()

    habits_list = [dict(habit) for habit in habitsAll]

    return jsonify(habits_list)

@app.route('/api/progressHabitID/<int:id>', methods=['GET'])
@cross_origin()
def getProgressHabitData(id):
    conn = db_conn()
    cur = conn.cursor()

    cur.execute("""
        SELECT * FROM progress_habits
        WHERE habit_id = ?
    """, (id,))

    # Fetch all results
    progress_data = cur.fetchall()

    # Close the database connection
    conn.close()

    # Check if data is found and return appropriate response
    if progress_data:
        # Convert the result to a list of dictionaries (optional)
        result = [
            {"id": row[0], "habit_id": row[1], "month_days": row[2], "list_checked": row[3]}
            for row in progress_data
        ]
        return jsonify(result), 200  # Return data with a 200 OK status
    else:
        return jsonify({"message": "No progress found for this habit ID"}), 404  # Return 404 if no data found



if __name__ == '__main__':
    app.run(debug=True)
