from flask import Flask,request,make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .config import Config
import os
from flask_cors import CORS  
from dotenv import load_dotenv
from sqlalchemy.ext.declarative import as_declarative, declared_attr


db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

@as_declarative()
class Base:
    @declared_attr
    def __tablename__(cls):
        if hasattr(cls, '_tablename_'):
            return cls._tablename_
        return cls.__name__.lower()

    @classmethod
    def set_tablename(cls, tablename):
        cls._tablename_ = tablename


def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app)
    load_dotenv()
    app.config.from_object(config_class)
    

    

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
   
    from .routes.tryingauth import auth_bp
    from .routes.api import api_bp
    from .routes.blogs import blog_bp
    from .routes.tests import test_bp
    from .routes.posts import post_bp
    from .routes.chat import chat_bp
    app.register_blueprint(auth_bp,url_prefix='/auth')
    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(blog_bp)
    app.register_blueprint(test_bp,url_prefix='/test')
    app.register_blueprint(post_bp,url_prefix='/comm')
    app.register_blueprint(chat_bp,url_prefix='/chat')
    # @app.before_request
    # def handle_options_request():
    #     if request.method == 'OPTIONS':
    #         response = make_response()
    #         response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    #         response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    #         response.headers.add("Access-Control-Allow-Methods", "GET,OPTIONS")
    #         response.headers.add("Access-Control-Allow-Credentials", "true")
    #         return response
    
    return app