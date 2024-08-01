from flask import Flask, request, jsonify
from flask_cors import CORS
from gradio_client import Client
from flask import Blueprint, jsonify, request, redirect, url_for
from flask_jwt_extended import jwt_required,get_jwt_identity
import requests
from datetime import datetime
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
from .. import db
from ..models.blog import Blog,Likes
from ..models.community import Post
from ..computeBlogs import computer
import google.generativeai as genai
from sqlalchemy import update,delete



client = Client("https://qwen-qwen1-5-72b-chat.hf.space/--replicas/z1vyw/")
chat_bp = Blueprint('chat', __name__)
conversation_history = []

@chat_bp.route('/chat', methods=['POST'])
def chat():
 global conversation_history
 user_input = request.json['message']

 if not conversation_history:
    conversation_history = [["System", "You are a compassionate and understanding therapist."]]
    client.predict("You are a compassionate and understanding therapist.", api_name="/modify_system_session")

 conversation_history.append(["User", user_input])

 result = client.predict(
    user_input,
    conversation_history,
    user_input,
    api_name="/model_chat"
)

 assistant_response = result[1][-1][1]
 conversation_history.append(["Assistant", assistant_response])

 return jsonify({
    'message': assistant_response,
    'history': conversation_history
})

@chat_bp.route('/clear', methods=['POST'])
def clear_session():
 global conversation_history
 conversation_history = []
 client.predict(api_name="/clear_session")
 return jsonify({'status': 'Session cleared'})

