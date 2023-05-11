from flask import  Flask, Blueprint,render_template, request, jsonify, make_response, send_file
from flask_cors import CORS
import sqlite3
from io import BytesIO
import base64
import time
# from server.admin2 import  admin2_bp
from admin1 import admin1_bp
from admin2 import admin2_bp




app = Flask(__name__, static_folder="../client/build", static_url_path="")
CORS(app)

# Register the blueprints for each app
app.register_blueprint(admin1_bp, url_prefix='/admin1')
app.register_blueprint(admin2_bp, url_prefix='admin2')
# app.register_blueprint(admin2_bp)

conn = sqlite3.connect('../db/database.db', check_same_thread= False)
cursor = conn.cursor()
cursor1 = conn.cursor()

# Testing image----------------------------------------------------------------
# img_cursor = conn.cursor()
# # Retrieve image data for image with ID 1
# img_cursor.execute("SELECT productImg FROM products WHERE ID=?",("P123",) )
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

@app.route('/Product/all', methods=['GET'])
def get_all_products():
    cursorp = conn.cursor()
    cursorp.execute("SELECT * FROM products")
    rows = cursorp.fetchall()
    products = []
    for row in rows:
        product = {
            "id": row[0],
            "name": row[1],
            "price": row[2],
            "stock": row[3],
            "type": row[4],
            "image": base64.b64encode(row[5]).decode('utf-8'), # convert bytes to base64 string
            "detail": row[6]
        }
        products.append(product)
        print(products)
    return jsonify(products)


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
    print(data['email'] )
    print(data['picture_data'])
    petsitter = 'NO'
    cursor.execute("INSERT INTO users (email,name,password, address, pet_sitter) VALUES (?, ? ,? ,?, ?)", (data['email'], data['name'], data['password'], data['address'], petsitter))
    conn.commit()
    return jsonify({'status': 'success'})

@app.route('/PersonList')
def personlist():
    return app.send_static_file('index.html')

@app.route('/Admin')
def adminupload():
    return app.send_static_file('index.html')

@app.route('/Admin/<pID>', methods=['POST'])
def Admin_upload_product_image(pID):
    print('profile pic')
    file = request.files['file']
    file_data = file.read()

    # Connect to the SQLite3 database
    Admincursor = conn.cursor()

    # Store the file data in the database for the specified user
    Admincursor.execute("UPDATE products SET productImg = ? WHERE ID = ?", (file_data, pID))
    conn.commit()
    print('Uploaded product image--------')
    return {'status': 'success'}    

@app.route('/Admin/texts', methods=['POST'])
def Admin_upload_product_texts():
    data = request.json
    cursor.execute("INSERT INTO products (ID, productName, productPrice, productStock, productDetail, productType) VALUES (?, ? ,? ,?, ?, ?)", (data['ID'], data['product_name'], data['price'], data['stock'], data['detail'], data['type'] ))
    conn.commit()
    return jsonify({'status': 'success'})

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


@app.route('/Profile/api', methods=['POST'])
def submit_form():
    print("hello from admin1")
    data = request.json
    # Retrieve form data from request object
    print(data['email'] + 'emaillllllllllllllllllllllllllllll')
    print(data['pet_sitter'] + 'pet stiiiiiiiiiiiiiiiiiiiiieeeeeeeeeeeeeerrrrrrrr')
    selected = ', '.join([key for key, value in data.get('selected').items() if value])
    serviceselected = ', '.join([key for key, value in data.get('serviceselected').items() if value])
    timerangeselectedValue = ', '.join([key for key, value in data.get('timerangeselectedValue').items() if value])
    petsizeselectedValue = ', '.join([key for key, value in data.get('petsizeselectedValue').items() if value])
    
    print("Hello from middle admin1")
    # selected = request.form.getlist('selected')
    # serviceselected = request.form.getlist('serviceselected')
    # timerangeselectedValue = request.form['timerangeselectedValue']
    # petsizeselectedValue = request.form['petsizeselectedValue']

    # Create connection to SQLite3 database and cursor object
    api_profile = conn.cursor()

    # Insert form data into table
    # UPDATE users SET picture_data = ? WHERE email = ?", (file_data, email)
    api_profile.execute("UPDATE users SET pet_sitter =?,preferable_pet =?, preferable_services = ?, preferable_timerange = ?, preferable_petsize =? WHERE email=?",(data['pet_sitter'],selected, serviceselected,  timerangeselectedValue, petsizeselectedValue,data['email'])) 
                        # (email, selected, serviceselected, timerangeselectedValue, petsizeselectedValue) VALUES (?, ?, ?, ?, ?)", (data['email'], selected, serviceselected,  timerangeselectedValue, petsizeselectedValue))

    # Commit changes and close connection
    conn.commit()

    return 'Form submitted successfully!'


@app.route('/search')
def search():
    print("searching")
    query = request.args.get('q')
    print("query: ", query)

    if not query:
        return jsonify({'error': 'No query specified'})

    cur = conn.cursor()

    cur.execute("SELECT productName FROM products WHERE productName LIKE ?", ('%' + query + '%',))
    rows = cur.fetchall()

    suggestions = [row[0] for row in rows]

    return jsonify({'suggestions': suggestions})

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

# app.debug = True
if __name__ == '__main__':
    app.run(host="127.0.0.1", port="5000")
