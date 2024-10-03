from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config.from_pyfile('config.py')

CORS(app)

db = SQLAlchemy(app)

from app import routes  # noqa: F401 E402
