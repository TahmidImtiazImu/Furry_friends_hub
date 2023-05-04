from flask import  Flask, render_template, request, jsonify, make_response, send_file
from flask_cors import CORS
import sqlite3
from io import BytesIO
import base64
import time


app = Flask(__name__, static_folder="../client/build", static_url_path="")
CORS(app)

conn = sqlite3.connect('../db/database.db', check_same_thread= False)
cursor = conn.cursor()
cursor1 = conn.cursor()

# Testing image----------------------------------------------------------------
# img_cursor = conn.cursor()
# # Retrieve image data for image with ID 1
# img_cursor.execute("SELECT picture_data FROM users WHERE email=?",("mf@gmail.com",) )
# img_result = img_cursor.fetchone()

# # Write image data to a file for inspection
# with open('retrieved_image2.jpg', 'wb') as f:
#     f.write(img_result[0])
# Finish Testing image --------------------------------------------------------

@app.route('/')
def homepage():
    return app.send_static_file('index.html')

@app.route('/Profile')
def profile():
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

@app.route('/Signupindividual')
def singupindividualreload():
    return app.send_static_file('index.html')

@app.route('/Signupindividual', methods=['POST'])
def singupindividual():
    print('signupppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp')
    data = request.json
    cursor.execute("INSERT INTO users (name, email,password, address,picture_data) VALUES (?, ? ,? ,?,?)", (data['name'], data['email'], data['password'], data['address'], data['picture_data']))
    conn.commit()
    return jsonify({'status': 'success'})

@app.route('/PersonList')
def personlist():
    return app.send_static_file('index.html')

# @app.route('/Profile/<email>', methods=['GET'])
# def getprofile(email):
#     profile_get = conn.cursor()
#     print('imagr1===============________________-------------+=======++++++_+_+_+_+_+_+++++++___')
#     profile_get.execute("SELECT picture_data FROM users WHERE email=?", (email,))
#     picture_data = profile_get.fetchone()[0]
#     print('image image')
#     response = make_response(picture_data)
#     response.headers.set('Content-Type', 'image/jpg')
#     # response.headers.set('Content-Disposition', 'attachment', filename='profile_picture/firstimage.jpg')
#     response.headers.set('Content-Disposition', 'attachment; filename=firstimage.jpg')
#     response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
#     response.headers.set('Pragma', 'no-cache')
#     response.headers.set('Expires', '0')
        
#     print('img img img img')
#     return response

# @app.route('/Profile', methods=['POST', 'GET'])
# def postprofile():
#     print('profile pic')
#     file = request.files['file']
#     file_data = file.read()

#     email = 'mf@gmail.com'  # assuming the username is sent in the request body

#     # Connect to the SQLite3 database
#     profilecurson = conn.cursor()

#     # Store the file data in the database for the specified user
#     profilecurson.execute("UPDATE users SET picture_data = ? WHERE email = ?", (file_data, email))
#     conn.commit()
#     print('Uploaded image--------')
#     return {'status': 'success'}


@app.route('/Profile/<email>', methods=['GET', 'POST'])
def update_profile(email):
    if request.method == 'POST':
        print('profile pic')
        file = request.files['file']
        file_data = file.read()

        # email = 'mf@gmail.com'  # assuming the username is sent in the request body

        # Connect to the SQLite3 database
        profilecurson = conn.cursor()

        # Store the file data in the database for the specified user
        profilecurson.execute("UPDATE users SET picture_data = ? WHERE email = ?", (file_data, email))
        conn.commit()
        print('Uploaded image--------')
        return {'status': 'success'}
    else:
        profile_get = conn.cursor()
        print('imagr1===============________________-------------+=======++++++_+_+_+_+_+_+++++++___')
        profile_get.execute("SELECT picture_data FROM users WHERE email=?", (email,))
        picture_data = profile_get.fetchone()[0]
        print('image image')
        response = make_response(picture_data)
        # response.headers.set('Content-Type', 'image/jpg')
        # # response.headers.set('Content-Disposition', 'attachment', filename='profile_picture/firstimage.jpg')
        # response.headers.set('Content-Disposition', 'attachment; filename=firstimage.jpg')
        # response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
        # response.headers.set('Pragma', 'no-cache')
        # response.headers.set('Expires', '0')
        
        print('img img img img')
        return response

@app.route('/Profile/texts/<email>', methods=['GET'])
def get_profile_name(email):
    profile_get = conn.cursor()
    profile_get.execute("SELECT name, address FROM users WHERE email=?", (email,))
    name_data, address_data = profile_get.fetchone()

    response = {
        "name": name_data,
        "address": address_data
    }

    return response

        # profile_get = conn.cursor()
        # print('imagr1===============________________-------------+=======++++++_+_+_+_+_+_+++++++___')
        # profile_get.execute("SELECT picture_data FROM users WHERE email=?", (email,))
        # print('iamage step 2')
        # picture_data = profile_get.fetchone()[0]
        # print('iamage step 3')
        # # if picture_data is None:
        # #     # If there is no picture data for this user, send a default image
        # #     with open("retrieved_image.jpg", "rb") as f:
        # #         picture_data = f.read()
        # # else:
        # #     picture_data = base64.b64encode(picture_data).decode('utf-8')
        # #     picture_data = BytesIO(base64.b64decode(picture_data))

        # return send_file(picture_data, mimetype='image/jpg')
# @app.route('/Profile<string:email>', methods=['GET'])
# def profile_get(email):
#     profile_get_conn = sqlite3.connect('my_database.db')
    # profile_get = profile_get_conn.cursor()
    # print('imagr1===============________________-------------+=======++++++_+_+_+_+_+_+++++++___')
    # profile_get.execute("SELECT picture_data FROM users WHERE email=?", (email,))
    # picture_data = profile_get.fetchone()[0]
    # profile_get_conn.close()
    # return send_file(picture_data, mimetype='image/jpg')
    # print('image image')
    # response = make_response(picture_data)
    # response.headers.set('Content-Type', 'image/jpg')
    # response.headers.set('Content-Disposition', 'attachment', filename='profile_picture/firstimage.jpg')
    # return response

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

# cursor1.execute('SELECT *FROM users')
# rows = cursor1.fetchall()

# # print the results
# for row in rows:
#     print(row)

# cursor.execute()

# cursor.execute("INSERT INTO users (username, password) VALUES ('john.doe', 'password123')")
# cursor.execute("INSERT INTO users (username, password) VALUES ('jane.doe', 'password456')")

conn.commit()

# conn.close()


if __name__ == '__main__':
    app.run(host="127.0.0.1", port="5000")
