from .. import db, Base
from sqlalchemy import Column, Integer, String,PrimaryKeyConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import declarative_base
from sqlalchemy.dialects.postgresql import JSONB
Base = declarative_base()
# class Test(Base, db.Model):
#    id=Column(db.Integer, primary_key=True)
#    question=Column(db.Text)
#    very_often=Column(db.Integer)
#    often=Column(db.Integer)
#    sometimes=Column(db.Integer)
#    never=Column(db.Integer)

#    @classmethod
#    def set_tablename(cls, tablename):
#         cls._tablename_ = tablename
#         cls.__table__ = db.Table(cls._tablename_, Base.metadata,
#                                  Column('id', Integer, primary_key=True),
#                                  Column('question', db.Text, nullable=False),
#                                  Column('very_often', Integer),
#                                  Column('often', Integer),
#                                  Column('sometimes', Integer),
#                                  Column('never', Integer),
#                                  autoload_with=db.engine)

class Test2(Base):
   __abstract__=True
   id=Column(db.Integer, primary_key=True)
   question=Column(db.Text)
   pnt_1=Column(db.Integer)
   pnt_2=Column(db.Integer)
   pnt_3=Column(db.Integer)
   pnt_4=Column(db.Integer)
   opt_1=Column(db.Text)
   opt_2=Column(db.Text)
   opt_3=Column(db.Text)
   opt_4=Column(db.Text)
   
   
class Testhist(db.Model):
   __tablename__='test_history'
   username=db.Column(db.String(80),nullable=False)
   test_id=db.Column(db.Integer,nullable=False)
   severity=db.Column(db.String(500),nullable=False)
   test_date=db.Column(db.Date)
   responses = db.Column(JSONB)
   __table_args__ = (PrimaryKeyConstraint('test_id', 'username'),)
# Test.set_tablename('quiz_adhd')   

