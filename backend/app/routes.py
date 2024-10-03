from flask import request
from app import app
from app.controller import AuthController, UserController, KnowledgeController

from app.openaiengine import OpenaiEngine


@app.route('/')
@app.route('/home')
def index():
    OpenaiEngine.create_ebbedings()

    return 'Index'


@app.route('/answer', methods=['POST'])
def answer():
    data = request.get_json()

    return OpenaiEngine.answer(data['question'])


# Auth
@app.route('/login', methods=['POST'])
def login():
    return AuthController.login(request)


# User
@app.route("/users", methods=["GET"])
def list_users():
    return UserController.list_users(request)


@app.route('/users', methods=['POST'])
def add_user():
    return UserController.add_user(request)


@app.route('/users', methods=['PUT'])
def update_user():
    return UserController.update_user(request)


@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    return UserController.get_user(request, user_id)


@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    return UserController.delete_user(request, user_id)


# Knowledge
@app.route("/knowledges", methods=["GET"])
def list_knowledges():
    return KnowledgeController.list_knowledges(request)


@app.route('/knowledges', methods=['POST'])
def add_knowledge():
    return KnowledgeController.add_knowledge(request)


@app.route('/knowledges', methods=['PUT'])
def update_knowledge():
    return KnowledgeController.update_knowledge(request)


@app.route('/knowledges/<int:knowledge_id>', methods=['GET'])
def get_knowledge(knowledge_id):
    return KnowledgeController.get_knowledge(request, knowledge_id)


@app.route("/knowledges/<int:knowledge_id>", methods=["DELETE"])
def delete_knowledge(knowledge_id):
    return KnowledgeController.delete_knowledge(request, knowledge_id)
