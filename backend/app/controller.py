from app import db
from app.models import KUser, Knowledge, KnowledgeFormated
from app.helper import Helper, AuthToken, ResponseWrapper, split_in_shorters

from tiktoken import get_encoding


# Controla autenticacao
class AuthController():

    def login(request):
        response_wrapper = ResponseWrapper()
        data = request.get_json()

        user = KUser.query.filter_by(
            username=data['username'],
            password=data['password']).first()
        if user:
            payload = Helper.get_payload(user.id)
            token = Helper.generate_jwt(payload)
            return response_wrapper.get_response(data={"token": token})

        return response_wrapper.get_response(
            status=401,
            message="Usuário ou senha invalido"
        )


# Controla usuarios
class UserController():

    def list_users(request):
        response_wrapper = ResponseWrapper()
        auth_token = AuthToken(request)
        if auth_token.is_error():
            return auth_token.get_return()

        users = KUser.query.all()
        if not users:
            return response_wrapper.get_response(status=404, message="Não há usuários cadastrados")

        result = [{"id": str(user.id), "username": user.username} for user in users]
        return response_wrapper.get_response(data=result)

    def add_user(request):
        response_wrapper = ResponseWrapper()
        data = request.get_json()

        user = KUser(username=data['username'], useremail=data['username'], password=data['password'])
        db.session.add(user)
        db.session.commit()

        return response_wrapper.get_response(status=201, message="Usuário criado com sucesso")

    def update_user(request):
        response_wrapper = ResponseWrapper()
        auth_token = AuthToken(request)
        if auth_token.is_error():
            return auth_token.get_return()

        data = request.get_json()
        if data['id']:
            user = KUser.query.get(int(data['id']))
            if not user:
                return response_wrapper.get_response(status=404, message="Usuário não encontrado")

            user.username = data['username']
            user.useremail = data['useremail']
            user.password = data['password']

            db.session.add(user)
            db.session.commit()

            return response_wrapper.get_response(status=200, message="Usuário atualizado com sucesso")

    def get_user(request, user_id):
        response_wrapper = ResponseWrapper()
        auth_token = AuthToken(request)
        if auth_token.is_error():
            return auth_token.get_return()

        user = KUser.query.get(user_id)
        if not user:
            return response_wrapper.get_response(status=404, message="Usuário não encontrado")

        return response_wrapper.get_response(
            data={
                'id': user.id,
                'username': user.username,
                'useremail': user.useremail,
                'password': user.password
            }
        )

    def delete_user(request, user_id):
        response_wrapper = ResponseWrapper()
        auth_token = AuthToken(request)
        if auth_token.is_error():
            return auth_token.get_return()

        user = KUser.query.get(user_id)
        if not user:
            return response_wrapper.get_response(status=404, message="Usuário não encontrado")

        db.session.delete(user)
        db.session.commit()

        return response_wrapper.get_response(message="Usuário deletado com sucesso")


# Controla Knowledge
class KnowledgeController():

    # ALL
    def list_knowledges(request):
        response_wrapper = ResponseWrapper()
        auth_token = AuthToken(request)
        if auth_token.is_error():
            return auth_token.get_return()

        knowledges = Knowledge.query.all()
        if not knowledges:
            return response_wrapper.get_response(status=404, message="Não há conhecimentos cadastrados")

        result = [{"id": str(knowledge.id), "subject": knowledge.subject} for knowledge in knowledges]

        return response_wrapper.get_response(data=result)

    # CREATE
    def add_knowledge(request):
        response_wrapper = ResponseWrapper()
        auth_token = AuthToken(request)
        if auth_token.is_error():
            return auth_token.get_return()

        auth_uid = auth_token.get_subject()
        user = KUser.query.get(auth_uid)
        if not user:
            return response_wrapper.get_response(status=401, message="Requer um usuário autenticado")

        data = request.get_json()

        # cl100k_base que foi projetado para funcionar com o ada-002
        tokenizer = get_encoding("cl100k_base")
        tokens = tokenizer.encode(data['information'])
        token_count = len(tokens)

        knowledge = Knowledge(
            subject=data['subject'],
            information=data['information'],
            token_count=token_count,
            kuser_id=user.id
        )
        db.session.add(knowledge)
        db.session.commit()

        max_tokens = 500
        splited_list = []
        sanitized = knowledge.information.replace('\r', '').replace('\n', ' ')
        if token_count > max_tokens:
            splited_list = split_in_shorters(tokenizer, sanitized, max_tokens)
        else:
            splited_list.append(sanitized)

        for text_block in splited_list:
            knowledge_formated = KnowledgeFormated()
            knowledge_formated.token_count = len(tokenizer.encode(text_block))
            knowledge_formated.resized = text_block
            knowledge_formated.knowledge_id = knowledge.id

            db.session.add(knowledge_formated)

        db.session.commit()
        return response_wrapper.get_response(status=201, message="Conhecimento criado com sucesso")

    # UPDATE
    def update_knowledge(request):
        response_wrapper = ResponseWrapper()
        auth_token = AuthToken(request)
        if auth_token.is_error():
            return auth_token.get_return()

        data = request.get_json()
        if data['id']:
            knowledge = Knowledge.query.get(int(data['id']))
            if not knowledge:
                return response_wrapper.get_response(status=404, message="Conhecimento não encontrado")

            # cl100k_base que foi projetado para funcionar com o ada-002
            tokenizer = get_encoding("cl100k_base")
            tokens = tokenizer.encode(data['information'])
            token_count = len(tokens)

            knowledge.subject = data['subject']
            knowledge.information = data['information']
            knowledge.token_count = token_count

            db.session.add(knowledge)
            db.session.commit()

            for formated in knowledge.formateds:
                db.session.delete(formated)

            db.session.commit()

            max_tokens = 500
            splited_list = []
            sanitized = knowledge.information.replace('\r', '').replace('\n', ' ')
            if token_count > max_tokens:
                splited_list = split_in_shorters(tokenizer, sanitized, max_tokens)
            else:
                splited_list.append(sanitized)

            for text_block in splited_list:
                knowledge_formated = KnowledgeFormated()
                knowledge_formated.token_count = len(tokenizer.encode(text_block))
                knowledge_formated.resized = text_block
                knowledge_formated.knowledge_id = knowledge.id

                db.session.add(knowledge_formated)

            db.session.commit()

            return response_wrapper.get_response(message="Conhecimento atualizado com sucesso")

    # GET
    def get_knowledge(request, knowledge_id):
        response_wrapper = ResponseWrapper()
        auth_token = AuthToken(request)
        if auth_token.is_error():
            return auth_token.get_return()

        knowledge = Knowledge.query.get(knowledge_id)
        if not knowledge:
            return response_wrapper.get_response(status=404, message="Conhecimento não encontrado")

        return response_wrapper.get_response(
            data={
                'id': str(knowledge.id),
                'subject': knowledge.subject,
                'information': knowledge.information
            }
        )

    # DELETE
    def delete_knowledge(request, knowledge_id):
        response_wrapper = ResponseWrapper()
        auth_token = AuthToken(request)
        if auth_token.is_error():
            return auth_token.get_return()

        knowledge = Knowledge.query.get(knowledge_id)
        if not knowledge:
            return response_wrapper.get_response(status=404, message="Conhecimento não encontrado")

        for formated in knowledge.formateds:
            db.session.delete(formated)

        db.session.delete(knowledge)
        db.session.commit()

        return response_wrapper.get_response(message="Conhecimento deletado com sucesso")
