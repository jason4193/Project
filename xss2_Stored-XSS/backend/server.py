from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import subprocess
import threading
import time
from mysql.connector import Error, pooling

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

dbconfig = {
    "host": "xss2-database",
    # "host": "localhost",
    "user": "root",
    "password": "password",
    "database": "xss2"
}
connection_pool = mysql.connector.pooling.MySQLConnectionPool(pool_name="mypool",
                                                              pool_size=5,
                                                              **dbconfig)

def get_db_connection():
    try:
        connection = connection_pool.get_connection()
        if connection.is_connected():
            print('Connected to the database', flush=True)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}", flush=True)
        return None

link = 'http://localhost:3000'

# Middleware for authentication
def authentication(func):
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT id FROM users WHERE flag=%s", (token,))
        user = cursor.fetchone()
        cursor.close()
        db.close()
        if user:
            return func(*args, **kwargs)
        else:
            return jsonify({'error': 'Unauthorized access'}), 401
    wrapper.__name__ = func.__name__
    return wrapper

@app.route('/blogs', methods=['GET'])
def get_blogs():
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT blogs.id, blogs.title, blogs.content, users.username FROM blogs INNER JOIN users ON users.id = blogs.userid")
    blogs = cursor.fetchall()
    cursor.close()
    db.close()

    json_blogs = []
    for blog in blogs:
        blog = {
            'id': blog[0],
            'title': blog[1],
            'content': blog[2],
            'author': blog[3]
        }
        json_blogs.append(blog)

    return jsonify(json_blogs)

@app.route('/login', methods=['POST'])
def login():
    request_data = request.json
    username = request_data['username']
    password = request_data['password']
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT flag FROM users WHERE username=%s AND password=%s", (username, password))
    user = cursor.fetchone()
    cursor.close()
    db.close()
    if user:
        return jsonify({'token': user[0]})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/blogs', methods=['POST'])
@authentication
def add_blog():
    request_data = request.json
    title = request_data['title']
    content = request_data['content']
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute("SELECT id FROM users WHERE flag=%s", (request.headers.get('Authorization'),))
    user_id = cursor.fetchone()

    statement = f"INSERT INTO blogs (title, content, userid) VALUES ('{title}', '{content}', {user_id[0]})"
    cursor.execute(statement)
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'message': 'Blog added successfully'})

@app.route('/blogs/<int:id>', methods=['DELETE'])
@authentication
def delete_blog(id):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("DELETE FROM blogs WHERE id=%s", (id,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'message': 'Blog deleted successfully'})

def simulate_user_visit(link):
    if link.startswith('http://localhost:3000'):
        print('Simulating user visit to ' + link, flush=True)
        result = subprocess.run(['node', 'puppeteer_script.js', link], capture_output=True, text=True)
        print('Puppeteer script output:', result.stdout, flush=True)
        return result.stdout
    else:
        return 'Invalid link. Only links starting with http://localhost:3000 are allowed.'

def periodic_task():
    global link
    while True:
        if link:
            print('Periodic task running with link:', link, flush=True)
            print(simulate_user_visit(link), flush=True)
        time.sleep(30)

if __name__ == '__main__':
    threading.Thread(target=periodic_task, daemon=True).start()
    app.run(debug=True, host='0.0.0.0', port=3001)