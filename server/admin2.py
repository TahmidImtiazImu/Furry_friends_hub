from flask import  Flask, Blueprint,render_template, request, jsonify, make_response, send_file
from flask_cors import CORS
import sqlite3
from io import BytesIO
import base64
import time

admin2_bp = Blueprint('admin2', __name__)

conn2 = sqlite3.connect('../db/database.db', check_same_thread= False)