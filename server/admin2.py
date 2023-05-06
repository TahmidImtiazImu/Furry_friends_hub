from flask import  Flask, Blueprint,render_template, request, jsonify, make_response, send_file
from flask_cors import CORS
import sqlite3
from io import BytesIO
import base64
import time

admin2_bp = Blueprint('admin2', __name__)

app = Flask(__name__, static_folder="../client/build", static_url_path="")
CORS(app)

conn2 = sqlite3.connect('../db/database.db', check_same_thread= False)

@app.route('/Product/all', methods=['GET'])
def get_all_products():
    cursorp = conn2.cursor()
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

# @app.route('/Product/all', methods=['GET'])
# def get_all_products():
#     cursor = conn2.cursor()
#     cursor.execute("SELECT * FROM products")
#     rows = cursor.fetchall()
#     products = []
#     for row in rows:
#         product = {
#             "id": row[0],
#             "name": row[1],
#             "price": row[2],
#             "stock": row[3],
#             "type": row[4],
#             "image": row[5],
#             "detail": row[6]
#         }
#         products.append(product)
#     return jsonify(products)


# @app.route('/Product/texts', methods=['GET'])
# def Admin_upload_product_texts(ID):
#     profile_get = conn2.cursor()
#     profile_get.execute("SELECT name, address FROM users WHERE email=?", (ID,))
#     name_data, address_data = profile_get.fetchone()

#     response = {
#         "name": name_data,
#         "address": address_data
#     }

#     return response