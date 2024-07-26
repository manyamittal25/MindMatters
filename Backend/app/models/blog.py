from .. import db
from sqlalchemy import PrimaryKeyConstraint
class Blog(db.Model):
    __tablename__ = 'blogs'
    id = db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    summary = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(100), nullable=False)
    upload_date = db.Column(db.Date)
    likes=db.Column(db.Integer, unique=True, nullable=False)  
    imagelink=db.Column(db.String(500), nullable=False)  

class Likes(db.Model):
    __tablename__='likehistory'
    blog_id=db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(80),  nullable=False)
    __table_args__ = (PrimaryKeyConstraint('blog_id', 'username'),)
    # def getById(Id):
    #     self.query.filter_by(id=Id).first()