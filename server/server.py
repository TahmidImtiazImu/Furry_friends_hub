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
import json



app = Flask(__name__, static_folder="../client/build", static_url_path="")
CORS(app)

# Register the blueprints for each app
app.register_blueprint(admin1_bp, url_prefix='/admin1')
app.register_blueprint(admin2_bp, url_prefix='admin2')
# app.register_blueprint(admin2_bp)

conn = sqlite3.connect('../db/database.db', check_same_thread= False)
cursor = conn.cursor()
cursor1 = conn.cursor()

@app.route('/')
def homepage():
    return app.send_static_file('index.html')

@app.route('/Profile')
def profile():
    return app.send_static_file('index.html')

@app.route('/Signup')
def singup():
    return app.send_static_file('index.html')

@app.route('/Login')
def login_reload():
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

@app.route('/Admin/Restock')
def Admin_restock():
    return app.send_static_file('index.html')

@app.route('/Admin/Orders')
def Admin_orders():
    return app.send_static_file('index.html')

@app.route('/TermsAndPolicies')
def Terms_and_policies():
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

#  Retrive only quantity from crat items--------------------------------
@app.route('/cart/products/<email>/<id>')
def get_cart_quantity(email, id):
    print("Email and id in cart from only quantity:")
    print(email)
    print(id)
    curs = conn.cursor()
    curs.execute("SELECT quantity FROM cart WHERE email=? AND items=?", (email,id))
    quantity = curs.fetchall()[0]
    return jsonify(quantity)

# Retreive from products for cart items
@app.route('/products/cart/<product_id>')
def get_product(product_id):
    print("retireving data for the cart!!!!!")
    cur = conn.cursor()
    cur.execute('SELECT productName, productPrice, productStock FROM products WHERE id = ?', (product_id,))
    row = cur.fetchone()
    if row:
        product = {'name': row[0], 'price': int(row[1]), 'stock': int(row[2])}
        return jsonify(product)
    else:
        return jsonify({'error': 'Product not found'})
    
# updating cart for quantity
@app.route('/api/cart/update', methods=['PUT'])
def update_cart_item_quantity():
    try:
        data = request.get_json()
        email = data.get('email')
        product_id = data.get('id')
        quantity = data.get('quantity')
        print(email)
        print(product_id)
        print(quantity)
        print("those are for update")
        curs = conn.cursor()
        curs.execute("UPDATE cart SET quantity = ? WHERE email = ? AND items = ?", (quantity, email, product_id))
        conn.commit()
        return jsonify({'message': 'Cart item updated successfully'})
    except Exception as e:
        print("Error: ", e)
        return jsonify({'success': False})
    
# Delete items from cart
@app.route('/api/cart/delete', methods=['DELETE'])
def delete_cart_item():
    try:
        data = request.get_json()
        email = data.get('email')
        product_id = data.get('id')
        print(email)
        print(product_id)
        print("Deleting item from the cart")
        curs = conn.cursor()
        curs.execute("DELETE FROM cart WHERE email = ? AND items = ?", (email, product_id))
        conn.commit()
        return jsonify({'message': 'Cart item deleted successfully'})
    except Exception as e:
        print("Error: ", e)
        return jsonify({'success': False})


# Define a route to handle the insertion of order data
@app.route('/api/order', methods=['POST'])
def handleBuyNow():
    try:
        # Extract data from request
        data = request.json
        email = data['email']
        cartItems = data['cartItems']
        totalPrice = data['price']
        status = data['status']
        customerName = data['name']
        phone = data['phone']
        contact = data['contact']
        address = data['address']
        note = data['note']

        print("Storing thess data on order command: ")
        print(email, totalPrice, status, customerName, phone, contact, address, note)
        
        # Serialize cartItems to a JSON string
        products_str = json.dumps(cartItems)

        # Insert order into the orders table
        connection = sqlite3.connect('../db/orders.db', check_same_thread= False)
        c = connection.cursor()
        c.execute("INSERT INTO orders (email, products, total_price, status, Name, Phone, Contact_mail, Address, Note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", (email, products_str, totalPrice, status, customerName, phone, contact, address, note))
        connection.commit()
        connection.close()

        curs = conn.cursor()
        for items in cartItems:
            print("decrementing stock for product")
            print(items)
            curs.execute("UPDATE products SET productStock = productStock - ? WHERE ID = ?", (int(items['quantity']), items['item']))
        conn.commit()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

# Admin orders checking -------------------------------------------------------------------------
@app.route('/api/orders', methods=['GET'])
def get_orders():
    print("Getting data from orders: ")
    c = sqlite3.connect('../db/orders.db', check_same_thread= False)
    db = c.cursor()
    db.execute('SELECT * FROM orders')
    orders = db.fetchall()
    Orders = []
    for order in orders:
        Order = {
            "id": order[0],
            "email": order[1],
            "products": order[2],
            "total_price": order[3],
            "status": order[4],
            "date": order[5],
            "Name": order[6],
            "Phone": order[7],
            "Contact_mail": order[8],
            "Address": order[9],
            "Note": order[10]
        }
        Orders.append(Order)
    print(Orders)
    c.commit()
    c.close()
    return jsonify(Orders)

@app.route('/api/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    print("Deleting data from orders: ")
    print(order_id)
    c = sqlite3.connect('../db/orders.db', check_same_thread= False)
    db = c.cursor()
    db.execute('DELETE FROM orders WHERE id = ?', (order_id,))
    c.commit()
    c.close()
    return '', 204

@app.route('/api/orders/<int:order_id>/shipment', methods=['PUT'])
def update_order_shipment(order_id):
    print("Updating shipment status for order: ")
    print(order_id)
    c = sqlite3.connect('../db/orders.db', check_same_thread= False)
    db = c.cursor()
    db.execute('UPDATE orders SET status = ? WHERE id = ?', ('Shipped', order_id,))
    c.commit()
    c.close()
    return '', 204


@app.route('/Cart')
def cart():
    return app.send_static_file('index.html')

@app.route('/Petsitter')
def petsitter():
    return app.send_static_file('index.html')

@app.route('/Signupindividual')
def singupindividualreload():
    return app.send_static_file('index.html')

@app.route('/Notification')
def Notification():
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

@app.route('/Admin/restock', methods=['POST'])
def Admin_update_stock():
    data = request.json
    print("Updating product stock!")
    print(data['stock'], data['ID'])
    cursor.execute("UPDATE products SET productStock = ? WHERE ID = ?", (data['stock'], data['ID']))
    conn.commit()
    return jsonify({'status': 'success'})


@app.route('/Profile/<email>', methods=['GET', 'POST'])
def update_profile(email):
    if request.method == 'POST':
        print('profile pic')
        file = request.files['file']
        file_data = file.read()

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
    print(pet)
    print(timerange)
    print(service)
    print(petsize)
    print(area)

    query = """
        SELECT * FROM users 
        WHERE preferable_pet LIKE '%{pet}%'  
        AND preferable_services LIKE '%{service}%'
        AND preferable_timerange LIKE '%{timerange}%' 
        AND preferable_petsize LIKE '%{petsize}%' 
        """.format(pet=pet, service=service, timerange=timerange, petsize=petsize)
    petsitter.execute(query)
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

@app.route('/api/notifications', methods=['POST'])
def send_notification():
    data = request.get_json()
    customer_id = data['customer_id']
    server_id = data['server_id']
    pet_sitting = data['pet_sitting']
    mobile = data['mobile']
    confirmation = data['confirmation']
    pet = data['pet']
    service = data['service']
    timerange = data['timerange']
    petsize = data['petsize']
    area = data['area']

    notification = conn.cursor()
    notification.execute('INSERT INTO notifications (customer_id, serviceprovider_id, petsitting, mobile, confirmation,pet,service,timerange,petsize,area) VALUES (?, ?, ?, ? ,?,?,?,?,?,?)', (customer_id, server_id,pet_sitting,mobile,confirmation,pet,service,timerange,petsize,area))
    conn.commit()
    return jsonify({'status': 'success'})

@app.route('/api/notifications/service/reject', methods=['POST'])
def reject_service_notification():
    data = request.get_json()
    delete = conn.cursor()
    id = data['id']
    print("iddddddddddddddddddddddddd")
    print(id )
    delete.execute("DELETE FROM notifications WHERE id = ?", (id,))
    customer_id = data['customer_id']
    server_id = data['server_id']
    pet_sitting = data['pet_sitting']
    mobile = data['mobile']
    confirmation = data['confirmation']
    pet = data['pet']
    service = data['service']
    timerange = data['timerange']
    petsize = data['petsize']
    area = data['area']

    notification = conn.cursor()
    notification.execute('INSERT INTO notifications (customer_id, serviceprovider_id, petsitting, mobile, confirmation,pet,service,timerange,petsize,area) VALUES (?, ?, ?, ? ,?,?,?,?,?,?)', (customer_id, server_id,pet_sitting,mobile,confirmation,pet,service,timerange,petsize,area))
    conn.commit()
    return jsonify({'status': 'success'})


@app.route('/Notification/api/server/<email>', methods=['GET'])
def get_service_by_email(email):
    print("hi from /notificaition/server/api")
    notification_server = conn.cursor()
    notification_server.execute('SELECT * FROM notifications WHERE serviceprovider_id = ? AND confirmation = ?', (email,"NULL"))
    users = notification_server.fetchall()
    print(users)
    result =  []
    for row in users:
        user = {
            'id' : row[0],
            'customer_id' : row[1],
            'serviceprovider_id': row[2],
            'pet' : row[6],
            'service' : row[7],
            'timerange' : row[8],
            'petsize' : row[9],
            'area' : row[10],
        }
        result.append(user)
    conn.commit()
    return jsonify(result)

@app.route('/Notification/api/customer/<email>', methods=['GET'])
def get_customer_by_email(email):
    print("hi from /notificaition/customer/api")
    Notification_customer = conn.cursor()
    notification_customer = conn.cursor()
    Notification_customer.execute("SELECT * FROM notifications WHERE customer_id = ? AND confirmation IN ('NO', 'YES') ORDER BY id DESC", (email,))


    users = Notification_customer.fetchall()
    # users2 = notification_customer.fetchall()
    print(users)
    result =  []
    for row in users:
        user = {
            'id' : row[0],
            'customer_id': row[1],
            'serviceprovider_id' : row[2],
            'mobile' : row[4],
            'confirmation' : row[5],
        }
        result.append(user)  
    conn.commit()
    return jsonify(result)

@app.route('/Order/api/customer/<email>', methods=['GET'])
def get_order_track_by_email(email):
    print("Retrieving order for tracking of " + email)
    c = sqlite3.connect('../db/orders.db', check_same_thread= False)
    curs = c.cursor()
    curs.execute("SELECT *FROM orders WHERE email = ?", (email,))
    orders = curs.fetchall()
    # print(orders)

    results=[]
    for order in orders:
        print(order[4])
        if(order[4] != 'confirmed'):
            result ={
                'id': order[0],
                'email': order[1],
                'products': order[2],
                'total_price': order[3],
                'status': order[4], 
                'created_date': order[5],
                'Name': order[6],
                'Phone': order[7],
                'Contact_mail': order[8],
                'Address': order[8],
                'Note': order[9] 
            }
            results.append(result)
    return jsonify(results)

@app.route('/Order/api/customer/<int:order_id>', methods=['PUT'])
def update_order_status(order_id):
    try:
        # Extract the new status from the request body
        new_status = request.json.get('status')

        # Update the order status in the database
        con = sqlite3.connect('../db/orders.db', check_same_thread=False)
        cursor = con.cursor()
        cursor.execute("UPDATE orders SET status = ? WHERE id = ?", (new_status, order_id))
        con.commit()
        con.close()

        return 'Order status updated successfully', 200
    except:
        return 'Failed to update order status', 500

@app.route('/user/api/server/<email>', methods=['GET'])
def get_serviceprovidername_notification(email):
    print("hi from /user/api/customer/")
    Notification_customer = conn.cursor()
    Notification_customer.execute('SELECT name FROM users WHERE email = ?', (email,))
    user_name = Notification_customer.fetchone()[0]
    print(user_name)
   
    conn.commit()
    return jsonify(user_name)

@app.route('/user/api/customer/<email>', methods=['GET'])
def get_customername_notification(email):
    print("hi from /user/api/customer/")
    notification_customer = conn.cursor()
    notification_customer.execute('SELECT name FROM users WHERE email = ?', (email,))
    user_name1 = notification_customer.fetchone()[0]
    print(user_name1)
   
    conn.commit()
    return jsonify(user_name1)


@app.route('/api/cusotmerdelete/notification', methods=['POST'])
def customerdelete_notification():
    data = request.get_json()
    notification_delete = conn.cursor()
    id = data['id']
    print("iddddddddddddddddddddddddd")
    print(id )
    notification_delete.execute("DELETE FROM notifications WHERE id = ?", (id,))
    conn.commit()
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)

conn.commit()

# conn.close()

# app.debug = True
if __name__ == '__main__':
    app.run(host="127.0.0.1", port="5000")
