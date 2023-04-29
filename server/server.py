from flask import  Flask, render_template
from flask_cors import CORS

app = Flask(__name__, static_folder="../client/build", static_url_path="")
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run()





