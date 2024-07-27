from flask import Blueprint, jsonify, request, redirect, url_for
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..models.test import Test2,Testhist
from ..models.user import User
from sqlalchemy import update,MetaData,Table,Column
from sqlalchemy.orm import mapper
from sqlalchemy.orm import sessionmaker
test_bp = Blueprint('test', __name__)
from .. import db


def create_test_model(tablename):
    """Creates a Test model with the specified tablename."""
   
    class Test(Test2):
        __tablename__ = tablename
        __table_args__ = {'extend_existing': True} 
    
    
    
    return Test

@test_bp.route('/',methods=['GET'])
# @jwt_required()
def get_test():
    topic = request.args.get('topic')
    table_name = f'quiz_{topic}'
    print(table_name)
    TestModel=create_test_model(table_name)
    Session = sessionmaker(bind=db.engine)
    session = Session()

# Query all records from TestModel
    results = session.query(TestModel).all()

    test_data = [{
        'question': row.question,
        'opt_1': row.opt_1,
        'opt_2': row.opt_2,
        'opt_3': row.opt_3,
        'opt_4': row.opt_4,
        'pnt_1':row.pnt_1,
        'pnt_2':row.pnt_2,
        'pnt_3':row.pnt_3,
        'pnt_4':row.pnt_4,
    } for row in results]

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

@test_bp.route('/addResult',methods=['POST'])
@jwt_required()
def updateResults():
    username=get_jwt_identity()
    # test_id=request.args.get('id')
    
    data = request.get_json()
    print(data)
    
    topic = data.get('topic')
    mapping={'anxiety': 0,
     'adhd':1,'bipolar':2,
     'autism':3,'depression':4,
     'ocd':'5', 'ptsd':6,
     'bulimia':7
     }
    test_id=mapping[topic]
    record=Testhist.query.filter_by(username=username,test_id=test_id).first()
    if(record):
       db.session.delete(record)
       db.session.commit()
    
    new_record = Testhist(
        username=username,
        test_id=test_id,
        severity=data.get('severity'),
        test_date= db.func.current_date(),
        responses=data.get('responses')
        )
    
    db.session.add(new_record)
    db.session.commit()
    return jsonify('result updated successfully'),200
    
# @test_bp.route('/getHelp',methods=['GET']) 
# def getHelp():





    

    