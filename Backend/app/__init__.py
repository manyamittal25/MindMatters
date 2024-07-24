from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .config import Config
import os
from dotenv import load_dotenv

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()



def create_app(config_class=Config):
    app = Flask(__name__)
    load_dotenv()
    app.config.from_object(config_class)
    

    

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    from .routes.tryingauth import auth_bp
    from .routes.api import api_bp
    from .routes.blogs import blog_bp
    app.register_blueprint(auth_bp,url_prefix='/auth')
    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(blog_bp)
    
    return app