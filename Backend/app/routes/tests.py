from flask import Blueprint, jsonify, request, redirect, url_for
import requests
import json
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..models.test import Test2,Testhist
from ..models.user import User
from sqlalchemy import update,MetaData,Table,Column
from sqlalchemy.orm import mapper
from sqlalchemy.orm import sessionmaker
test_bp = Blueprint('test', __name__)
from .. import db
import urllib.request
from bs4 import BeautifulSoup
from typing import List
import google.generativeai as genai
import os

def create_test_model(tablename):
    """Creates a Test model with the specified tablename."""
   
    class Test(Test2):
        __tablename__ = tablename
        __table_args__ = {'extend_existing': True} 
    
    
    
    return Test

def scrape_doctor_info(city: str, ailment: str) -> List[str]:
    replacement_string = '%20'
    ailment = ailment.replace(' ', replacement_string)
    city = city.replace(' ', replacement_string)
    
    # Providing URL
    url = f"https://www.practo.com/search/doctors?results_type=doctor&q=%5B%7B%22word%22%3A%22{ailment}%22%2C%22autocompleted%22%3Atrue%2C%22category%22%3A%22subspeciality%22%7D%5D&city={city}"
    
    # Setting the headers
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
    
    try:
        # Creating a request object
        request = urllib.request.Request(url, headers=headers)
        
        # Opening the URL for reading
        html = urllib.request.urlopen(request)
        
        # Parsing the HTML file
        htmlParse = BeautifulSoup(html, 'html.parser')
        
        # Finding all divs with the specified class name
        div_contents = htmlParse.find_all("div", class_='listing-doctor-card')
        
        # Extracting and returning all the data inside each div as a list of strings
        return [div.get_text(strip=True) for div in div_contents]
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

genai.configure(api_key=os.environ.get('GENAI_API_KEY'))

# Define the function
def extract_ailment_info(ailment):
    # Choose a model that's appropriate for your use case
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    # Create the prompt
    prompt = (f'give some details about the ailment {ailment} very briefly and then give some solutions to it pointwise')
    
    # Generate content
    response = model.generate_content(prompt)
    
    # Return the response text
    return response.text

def extract_doctor_info(doctor_info_list):
    # Choose a model that's appropriate for your use case
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    # Create the prompt
    prompt = ('This is a list of strings of data of doctors scraped from the web. '
              'Extract the doctor name, specialization, years of experience, address and '
              'return them all as a list of JSON objects. Return nothing else as this is going '
              'to be fed in response to an API, : ' + str(doctor_info_list))
    
    # Generate content
    response = model.generate_content(prompt)
    
    # Return the response text
    return response.text

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
    
@test_bp.route('/getHelp',methods=['GET']) 
def getHelp():
    # Extract parameters from the request
    data=request.get_json()
    lat = data.get('lat')  # Use request.args for query parameters

    lon = data.get('long')
    
    # Get the API key from environment variables
    appid = os.environ.get('OPEN_WEATHER_KEY')
    
    # Check if API key is available
    if not appid:
        return jsonify({'error': 'API key not found'}), 500
    
    # Construct the URL
    url = f'http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&appid={appid}'
    
    # Make the API call
    # try:
    response = requests.get(url)
    response.raise_for_status()  # Raise an error for HTTP errors
    print(response.json()[0]['name'])
    location=response.json()[0]['name']
    doctor_info=scrape_doctor_info(location,'psychiatrist')
    print(doctor_info)
    result='[]'
    if(len(doctor_info)>0):
      result=extract_doctor_info(doctor_info)
      result=result.replace('```','')
      result=result.replace('json','')
    print(result)
    output = json.loads(result)
    return jsonify(output)

@test_bp.route('/getSuggestion',methods=['GET']) 
def getSuggestion():
    topic=request.args.get('topic')
    info=extract_ailment_info(topic)
    return jsonify(info)



   


    

    