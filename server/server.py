from flask import  Flask, render_template
from flask_cors import CORS

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

@app.route('/PetSitter')
def cart():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(host="127.0.0.1", port="5000")





