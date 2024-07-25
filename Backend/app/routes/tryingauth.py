from flask import Blueprint, jsonify, request, redirect, url_for
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_oauthlib.client import OAuth
import requests
import os
from ..models.user import User
from .. import db

auth_bp = Blueprint('auth', __name__)

oauth = OAuth()

google = oauth.remote_app(
    'google',
    consumer_key=os.environ.get('GOOGLE_CLIENT_ID'),
    consumer_secret=os.environ.get('GOOGLE_CLIENT_SECRET'),
    request_token_params={
        'scope': 'email profile',
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
)

@auth_bp.route('/')
def index():
    return jsonify(message="Welcome to the OAuth with JWT example")

@auth_bp.route('/login/google')
def login_google():
    return google.authorize(callback=url_for('auth.google_authorized', _external=True))

@auth_bp.route('/callback')
def google_authorized():
    response = google.authorized_response()
    if response is None or response.get('access_token') is None:
        return jsonify(message="Access denied"), 401

    access_token = response['access_token']
    headers = {'Authorization': f'Bearer {access_token}'}
    r = requests.get('https://www.googleapis.com/oauth2/v1/userinfo', headers=headers)
    user_info = r.json()
    username = user_info['email']
    name = user_info['name']

    user = User.query.filter_by(username=username).first()

    if not user:
        user = User(username=username, password='', name=name, email=username)
        db.session.add(user)
        db.session.commit()

    jwt_token = create_access_token(identity=username)
    print(jwt_token)
    redirect_url=os.environ.get('FRONTEND_URL')
    return redirect(f'{redirect_url}authCallback?access_token={jwt_token}')

@google.tokengetter
def get_google_oauth_token():
    return None

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@auth_bp.route('/getUser',methods=['GET'])
@jwt_required()
def getUserInfo():
    
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    data={
        'email':user.email,
        'name':user.name,
        'diagnosis': user.diagnosis,



    }
    return jsonify(data)