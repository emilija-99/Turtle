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
    cur.execute("SELECT * FROM HABIT_A")
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

    cur.execute("SELECT * FROM HABIT_A")
    habitsAll = cur.fetchall()
    conn.close()

    habits_list = [dict(habit) for habit in habitsAll]

    return jsonify(habits_list)
if __name__ == '__main__':
    app.run(debug=True)
