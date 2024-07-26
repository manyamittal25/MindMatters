from .. import db, Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import declarative_base

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
   very_often=Column(db.Integer)
   often=Column(db.Integer)
   sometimes=Column(db.Integer)
   never=Column(db.Integer)
   

# Test.set_tablename('quiz_adhd')   

