from .. import db

class Blog(db.Model):
    __tablename__ = 'blogs'
    id = db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    summary = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(100), nullable=False)
    upload_date = db.Column(db.Date)
    likes=db.Column(db.Integer, unique=True, nullable=False)    

    # def getById(Id):
    #     self.query.filter_by(id=Id).first()