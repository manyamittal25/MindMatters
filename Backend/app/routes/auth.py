# from flask import Blueprint, request, jsonify
# from flask_jwt_extended import create_access_token
# from app.models.user import User
# from app import db
# from app.services.google_oauth_service import verify_google_token

# auth_bp = Blueprint('auth', __name__)

# @auth_bp.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()
#     user = User(username=data['username'], email=data['email'])
#     user.set_password(data['password'])
#     db.session.add(user)
#     db.session.commit()
#     return jsonify({'message': 'User created successfully'}), 201

# @auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     user = User.query.filter_by(username=data['username']).first()
#     if user and user.check_password(data['password']):
#         access_token = create_access_token(identity=user.id)
#         return jsonify(access_token=access_token), 200
#     return jsonify({'message': 'Invalid credentials'}), 401

# @auth_bp.route('/google_login', methods=['POST'])
# def google_login():
#     token = request.json.get('token')
#     google_user = verify_google_token(token)
#     if google_user:
#         user = User.query.filter_by(email=google_user['email']).first()
#         if not user:
#             user = User(email=google_user['email'], google_id=google_user['sub'])
#             db.session.add(user)
#             db.session.commit()
#         access_token = create_access_token(identity=user.id)
#         return jsonify(access_token=access_token), 200
#     return jsonify({'message': 'Invalid Google token'}), 401