from flask import  Flask, Blueprint,render_template, request, jsonify, make_response, send_file
from flask_cors import CORS
import sqlite3
from io import BytesIO
import base64
import time
import urllib.parse
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
            "detail": row[6],
            "subtype": row[7]
        }
        products.append(product)
        # print(products)
    return jsonify(products)

@app.route('/Product/search/<query>', methods=['GET'])
def get_all_search_products(query):
    decoded_query = urllib.parse.unquote(query)
    cursorp = conn.cursor()
    cursorp.execute("SELECT * FROM products WHERE productName LIKE ?", ('%' + decoded_query + '%',))
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
            "detail": row[6],
            "subtype": row[7]
        }
        products.append(product)
        # print(products)
    return jsonify(products)


@app.route('/customerSignup')
def customerSignup():
    return app.send_static_file('index.html')

@app.route('/ServiceSIgnup')
def ServiceSignup():
    return app.send_static_file('index.html')


# Add to cart from product---------------------------------------
@app.route('/add-to-cart', methods=['POST'])
def add_to_cart():
    try:
        email = request.form['email']
        product_id = request.form['product_id']
        quantity = 1
        curs = conn.cursor()
        print("Inserting product id")
        print(product_id)
        print(email)
        curs.execute("INSERT INTO cart (email, items, quantity) VALUES (?, ?, ?)", (email, product_id, quantity))
        conn.commit()
        return jsonify({'success': True})
    except Exception as e:
        print("Error: ", e)
        return jsonify({'success': False})
 

#  Retrive from crat items--------------------------------
@app.route('/api/cart/<email>')
def get_cart(email):
    print("Email and id in cart:")
    print(email)
    cur = conn.cursor()
    cur.execute("SELECT * FROM cart WHERE email=?", (email,))
    rows = cur.fetchall()
    cart_items = [{'item': row[1], 'quantity': row[2]} for row in rows]
    for id in cart_items:
        print("ids: ")
        print(id['item'])
        print(id['quantity'])

    return jsonify(cart_items)

# Retreive from products for cart items
@app.route('/products/<int:product_id>')
def get_product(product_id):
    conn = sqlite3.connect('products.db')
    cursor = conn.cursor()
    cursor.execute('SELECT productName, productPrice FROM products WHERE id = ?', (product_id,))
    row = cursor.fetchone()
    if row:
        product = {'name': row[0], 'price': row[1]}
        return jsonify(product)
    else:
        return jsonify({'error': 'Product not found'})

# # Add to cart from product---------------------------------------
# @app.route('/add-to-cart', methods=['POST'])
# def add_to_cart():
    # email = request.form['email']
    # product_id = request.form['product_id']
#     c = conn.cursor()

#     # Check if the customer already has a cart
#     c.execute("SELECT * FROM cart WHERE email=?", (email,))
#     result = c.fetchone()
#     # print(result[1])

#     if result:
#         # Customer already has a cart, so update it
#         cart_items = result[1].split(',') if result[1] else []
#         if product_id not in cart_items:
#             cart_items.append(product_id)
#         cart_items_str = ','.join(cart_items)
#         print('the-cart-item-after-added----------------:    ')
#         print(cart_items_str)
#         c.execute("UPDATE cart SET items=? WHERE email=?", (cart_items_str, email))
#     else:
#         # Customer doesn't have a cart yet, so create a new one
#         print("Data is being inserted")
#         print(product_id)
#         c.execute("INSERT INTO cart (email, items) VALUES (?, ?)", (email, product_id))

#     # # Commit the changes to the database and close the connection
#     # conn.commit()
#     # conn.close()

#     return jsonify({'success': True})



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
    cursor.execute("INSERT INTO products (ID, productName, productPrice, productStock, productDetail, productType, productSubtype) VALUES (?, ? ,? ,?, ?, ?, ?)", (data['ID'], data['product_name'], data['price'], data['stock'], data['detail'], data['type'], data['subtype'] ))
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
    print("hello from profile/text/email")
    profile_get.execute("SELECT name, address, pet_sitter,preferable_pet,preferable_services,preferable_timerange,preferable_petsize FROM users WHERE email=?", (email,))
    name_data, address_data, pet_sitter_data,preferable_pet_data,preferable_services_data,preferable_timerange_data,preferable_petsize_data = profile_get.fetchone()
    
    response = {
        "name": name_data,
        "address": address_data,
        "pet_sitter" : pet_sitter_data,
        "preferable_pet" : preferable_pet_data,
        "preferable_services" : preferable_services_data,
        "preferable_timerange" : preferable_timerange_data,
        "preferable_petsize" : preferable_petsize_data
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


@app.route('/change-password', methods=['POST'])
def change_password():
    # Get the current user's ID from the session or request headers
    print("hello from password change")
    change_pass = conn.cursor()

    # Get the current password, new password, and confirm password from the request
    data = request.json
    email = data['email']
    new_password = data['newPassword']


    # TODO: Check that the current password is correct

    # Save the new password to the database
    print(new_password + 'new password')
    print(email + "email")
    change_pass.execute('UPDATE users SET password = ? WHERE email = ?', (new_password, email))
    conn.commit()

    return jsonify({'success': True})


@app.route('/api/users/<pet>/<service>/<timerange>/<petsize>/<area>', methods=['GET'])
def fetch_petsitters(pet,service,timerange,petsize,area):
    petsitter = conn.cursor()
    # Extract search criteria from request parameters
    # service = request.args.get('service')
    # timerange = request.args.get('timerange')
    # petsize = request.args.get('petsize')
    # area = request.args.get('area')
    # print("hello from petsitter data retrieve")
    # data = request.json
    
    print(pet)
    print(timerange)
    print(service)
    print(petsize)
    print(area)

    # # Define SQL query to fetch users based on search criteria
    # query = """
    # SELECT *
    # FROM users
    # WHERE (pet LIKE ? OR pet LIKE ? OR pet LIKE ?)
    # AND (service LIKE ? OR service LIKE ? OR service LIKE ?)
    # AND (petsize LIKE ? OR petsize LIKE ? OR petsize LIKE ?)
    # AND (timerange LIKE ? OR timerange LIKE ? OR timerange LIKE ?)
    # AND (location LIKE ?)
    # """

    # # Define search strings for each category
    # pet_search_strings = [f'%{val}%' for val in service.split()]
    # service_search_strings = [f'%{val}%' for val in service.split()]
    # petsize_search_strings = [f'%{val}%' for val in petsize.split()]
    # timerange_search_strings = [f'%{val}%' for val in timerange.split()]

    # Execute SQL query with search criteria
    petsitter.execute("SELECT *FROM users")
    # petsitter.execute(query, tuple(pet_search_strings + service_search_strings + petsize_search_strings + timerange_search_strings + [area]))
    rows = petsitter.fetchall()

    # Format results as JSON response
    result =  []
    for row in rows:
        user = {
            'email': row[0],
            'name': row[1],
            'location': row[2],
            'img': base64.b64encode(row[5]).decode('utf-8'),
        }
        result.append(user)
    conn.commit()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)

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
