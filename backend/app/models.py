from app import db


class KUser(db.Model):
    __tablename__ = 'kuser'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    useremail = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String)

    knowledges = db.relationship('Knowledge', backref='user', lazy=True)

    def __repr__(self) -> str:
        return f'KUser({self.id}, {self.username}, {self.useremail}, {self.password})'


class Knowledge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String, nullable=False)
    information = db.Column(db.Text, nullable=False)
    token_count = db.Column(db.Integer, nullable=False)

    kuser_id = db.Column(db.Integer, db.ForeignKey('kuser.id'), nullable=False)

    formateds = db.relationship('KnowledgeFormated', backref='knowledge', lazy=True)

    def __repr__(self) -> str:
        return f'Knowledge({self.id}, {self.subject}, {self.token_count})'


class KnowledgeFormated(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token_count = db.Column(db.Integer, nullable=False)
    resized = db.Column(db.Text, nullable=False)
    embeddings = db.Column(db.Text, default='')
    is_created = db.Column(db.Boolean, unique=False, default=False)

    knowledge_id = db.Column(
        db.Integer,
        db.ForeignKey('knowledge.id'),
        nullable=False
    )

    def __repr__(self) -> str:
        return f'KnowledgeFormated({self.id}, {self.token_count}, {self.resized})'
