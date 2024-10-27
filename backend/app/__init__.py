import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['ALGORITHM'] = os.getenv('ALGORITHM')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['OPENAI_KEY'] = os.getenv('OPENAI_KEY')

CORS(app)

db = SQLAlchemy(app)

from app import routes  # noqa: F401 E402
