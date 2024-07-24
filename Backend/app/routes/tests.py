from flask import Blueprint, jsonify, request, redirect, url_for
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..models.test import Test
from ..models.user import User
from sqlalchemy import update
test_bp = Blueprint('test', __name__)
from .. import db
@test_bp.route('/')
# @jwt_required()
def get_test():
    topic = request.args.get('topic')
    table_name = f'quiz_{topic}'
    print(table_name)
    
    Test.set_tablename(table_name)
    
    with db.engine.connect() as connection:
        # Reflect the new table name
        Test.metadata.reflect(bind=connection, only=[table_name])
        table = Test.__table__
        data = connection.execute(table.select()).fetchall()

    test_data = [{
        'question': row.question,
        'very_often': row.very_often,
        'often': row.often,
        'sometimes': row.sometimes,
        'never': row.never
    } for row in data]

    return jsonify(test_data), 200

@test_bp.route('/diagnosed',methods=['POST'])
@jwt_required()
def getResult():
    topic = request.args.get('topic')
    mapping={'anxiety': 0,
     'adhd':1,'bipolar':2,
     'autism':3,'depression':4,
     'ocd':'5', 'ptsd':6,
     'bulimia':7
     }
    code=mapping[topic]
    # diagnosis='0000000000'
    # diagnosis[code]=1
    current_user = get_jwt_identity()
    print(current_user)
    person=User.query.filter_by(email=current_user).first()
    current_diagnostic=person.diagnosis
    new_diagnosis=""
    if current_diagnostic[code]!=1:
        for i in range(len(current_diagnostic)):
            if i != code:
                new_diagnosis=new_diagnosis+current_diagnostic[i]
            else:
                new_diagnosis=new_diagnosis+'1'
    else:
        new_diagnosis=current_diagnostic
    
    print(new_diagnosis)
    new_values={'diagnosis':new_diagnosis}
    table = User.__table__
    stmt = (
        update(table)
        .where(table.c.email == current_user)
        .values(**new_values)
    )

    try:
        
        db.session.execute(stmt)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

    return jsonify({"message": "Record updated successfully"}), 200


    

    