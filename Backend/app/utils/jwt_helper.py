from flask_jwt_extended import create_access_token
from datetime import timedelta

def generate_token(user_id):
    expires = timedelta(days=1)
    access_token = create_access_token(identity=user_id, expires_delta=expires)
    return access_token