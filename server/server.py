from flask import  Flask, render_template, request, jsonify, make_response
from flask_cors import CORS
import sqlite3




app = Flask(__name__, static_folder="../client/build", static_url_path="")
CORS(app)

conn = sqlite3.connect('../db/database.db', check_same_thread= False)
cursor = conn.cursor()
cursor1 = conn.cursor()

@app.route('/')
def homepage():
    return app.send_static_file('index.html')

@app.route('/Signup')
def singup():
    return app.send_static_file('index.html')

@app.route('/Login', methods=['POST'])
def login():
    print("hello000000000000000000000000000000000000000000000000000000000000000000")
    email = request.json['email']
    password = request.json['password']
    logincursor = conn.cursor()
    
    print("check")
    # Retrieve user from database
    logincursor.execute("SELECT * FROM users WHERE email=? AND password=?", (email, password))
    user = logincursor.fetchone()

    # Check if user exists and password is correct
    if user:
        # Return success message
        response = {'message': 'Login successful'}
        print('successful')
        return jsonify({'verified': True})
    else:
        # Return error message
        response = {'message': 'Invalid username or password'}
        print('Invalid')
        return jsonify({'verified': False})

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

@app.route('/Signupindividual', methods=['POST'])
def singupindividual():
    print('signupppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp')
    data = request.json
    cursor.execute("INSERT INTO users (name, email,password) VALUES (?, ? ,?)", (data['name'], data['email'],data['password']))
    conn.commit()
    return jsonify({'status': 'success'})

@app.route('/PersonList')
def personlist():
    return app.send_static_file('index.html')

@app.route('/Profile',methods=['POST'])
def profile():
    print('profile pic')
    file = request.files['file']
    file_data = file.read()
    email = 'mf@gmail.com'  # assuming the username is sent in the request body

    # Connect to the SQLite3 database
    profilecurson = conn.cursor()

    # Store the file data in the database for the specified user
    profilecurson.execute("UPDATE users SET picture_data = ? WHERE email = ?", (file_data, email))
    conn.commit()

    return {'status': 'success'}

@app.route('/Profile<email>',methods=['GET'])
def profile_get(email):
    profile_get = conn.cursor()
    print('imagr1')
    profile_get.execute("SELECT picture_data FROM users WHERE email=?", (email,))
    picture_data = profile_get.fetchone()[10]

    # conn.close()
    print('image image')
    response = make_response(picture_data)
    response.headers.set('Content-Type', 'image/jpg')
    response.headers.set('Content-Disposition', 'attachment', filename='profile_picture.jpg')
    return response

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

cursor1.execute('SELECT *FROM users')
rows = cursor1.fetchall()

# print the results
for row in rows:
    print(row)

# cursor.execute()

# cursor.execute("INSERT INTO users (username, password) VALUES ('john.doe', 'password123')")
# cursor.execute("INSERT INTO users (username, password) VALUES ('jane.doe', 'password456')")

conn.commit()

# conn.close()


if __name__ == '__main__':
    app.run(host="127.0.0.1", port="5000")
