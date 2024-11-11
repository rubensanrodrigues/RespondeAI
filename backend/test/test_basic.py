import os

os.environ['SECRET_KEY'] = 'my_secret_key'
os.environ['ALGORITHM'] = 'HS256'
os.environ['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:mypgpasswd@localhost:5432/db'
os.environ['OPENAI_KEY'] = 'my_openai_key'

from app import app, db
from app.models import KUser, Knowledge, KnowledgeFormated
from app.openaiengine import OpenaiEngine

app.app_context().push()


def test_dbinit():
    db.drop_all()
    db.create_all()
    user = KUser(username='admin', useremail='admin@localhost', password='admin')
    db.session.add(user)
    db.session.commit()


def test_admin_recover():
    user = KUser.query.filter_by(
        username='admin',
        password='admin').first()
    if user:
        assert user.username == 'admin' and user.password == 'admin'


def test_knowledge_save():
    knowledge = Knowledge(
        subject='Conhecimento teste',
        information='Para testar a aplicação é necessário um conhecimento consistente e conciso',
        token_count=7,
        kuser_id=1
    )
    db.session.add(knowledge)
    db.session.commit()


def test_knowledge_recover():
    knowledge = Knowledge.query.filter_by(
        subject='Conhecimento teste').first()
    if knowledge:
        assert knowledge.subject == 'Conhecimento teste'
    else:
        assert False


def test_knowledge_formated_save():
    knowledge_formated = KnowledgeFormated()
    knowledge_formated.token_count = 7
    knowledge_formated.resized = 'Para testar a aplicação é necessário um conhecimento consistente e conciso'
    knowledge_formated.knowledge_id = 1
    db.session.add(knowledge_formated)
    db.session.commit()


def test_create_embedings():
    OpenaiEngine.create_ebbedings()

    knowledge_formated = KnowledgeFormated.query.filter_by(id=1).first()
    if knowledge_formated:
        assert knowledge_formated.embeddings


def test_answer():
    answer = OpenaiEngine.answer('O que é necessário para testar a aplicação')
    assert answer.find("consistente") > -1
