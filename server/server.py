from flask import  Flask, render_template
from flask_cors import CORS
import sqlite3




app = Flask(__name__, static_folder="../client/build", static_url_path="")
CORS(app)

@app.route('/')
def homepage():
    return app.send_static_file('index.html')

@app.route('/Signup')
def singup():
    return app.send_static_file('index.html')

@app.route('/Login')
def login():
    return app.send_static_file('index.html')

@app.route('/Product')
def product():
    return app.send_static_file('index.html')

@app.route('/customerSignup')
def customerSignup():
    return app.send_static_file('index.html')

@app.route('/ServiceSIgnup')
def ServiceSignup():
    return app.send_static_file('index.html')


@app.route('/Cart')
def cart():
    return app.send_static_file('index.html')

@app.route('/Petsitter')
def petsitter():
    return app.send_static_file('index.html')

@app.route('/Signupindividual')
def singupindividual():
    return app.send_static_file('index.html')

@app.route('/PersonList')
def personlist():
    return app.send_static_file('index.html')

@app.route('/Profile')
def profile():
    return app.send_static_file('index.html')

conn = sqlite3.connect('../db/database.db')
cursor = conn.cursor()
cursor1 = conn.cursor()



# # Create a pets table
# cursor.execute('''CREATE TABLE pets (
#                     id INTEGER PRIMARY KEY,
#                     name TEXT NOT NULL,
#                     species TEXT NOT NULL,
#                     age INTEGER NOT NULL
#                 )''')

# # Insert some sample data
# cursor.execute("INSERT INTO pets (name, species, age) VALUES ('Fluffy', 'Cat', 3)")
# cursor.execute("INSERT INTO pets (name, species, age) VALUES ('Buddy', 'Dog', 5)")
# cursor.execute("INSERT INTO pets (name, species, age) VALUES ('Gizmo', 'Hamster', 1)")

# execute the query and fetch the results
cursor.execute('SELECT * FROM users')
cursor1.execute('SELECT *FROM pets')
rows = cursor.fetchall()

# print the results
for row in rows:
    print(row)

rows2 = cursor1.fetchall()

# print the results
for row2 in rows2:
    print(row2)


# cursor.execute()

# cursor.execute("INSERT INTO users (username, password) VALUES ('john.doe', 'password123')")
# cursor.execute("INSERT INTO users (username, password) VALUES ('jane.doe', 'password456')")

conn.commit()

conn.close()


if __name__ == '__main__':
    app.run(host="127.0.0.1", port="5000")
