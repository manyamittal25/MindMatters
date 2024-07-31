from .. import db, Base
from sqlalchemy import Column, Integer, String,PrimaryKeyConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import declarative_base
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.types import JSON
Base = declarative_base()

class Post(Base):
    __abstract__=True
    id=db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    contents=db.Column(db.Text)
    comments = Column(MutableList.as_mutable(JSON), default=[])

    
 
    