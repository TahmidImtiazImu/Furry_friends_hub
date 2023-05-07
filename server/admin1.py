from flask import  Flask, Blueprint,render_template, request, jsonify, make_response, send_file
from flask_cors import CORS
from flask import  Flask, Blueprint,render_template, request, jsonify, make_response, send_file
from flask_cors import CORS
import sqlite3
from io import BytesIO
import base64
import time
admin1_bp = Blueprint('admin1', __name__)

conn1 = sqlite3.connect('../db/database.db', check_same_thread= False)

app = Flask(__name__, static_folder="../client/build", static_url_path="")
CORS(app)


