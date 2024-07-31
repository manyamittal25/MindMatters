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

def create_post_model(tablename):
    """Creates a Test model with the specified tablename."""
   
    class Posting(Post):
        __tablename__ = tablename
        __table_args__ = {'extend_existing': True} 
    
    
    
    return Posting


post_bp = Blueprint('post', __name__)

@post_bp.route('/getPosts',methods=['GET'])

def getPosts():
  community=request.args.get('comm')
  tablename=f"post_{community}"
  
  Model=create_post_model(tablename)
  result= db.session.query(Model).all()
  post_data = [{"id":data.id,
                "username":data.username,
                "contents":data.contents,
                "comments":data.comments}
                for data in result]  # Example transformation

  return jsonify(post_data), 200


@post_bp.route('/addPost',methods=['POST'])
@jwt_required()
def addPost():
   username=get_jwt_identity()
 
   comm=request.args.get('comm')
   print(comm)
   tablename=f"post_{comm}"
   Model=create_post_model(tablename)
   data = request.get_json()
   
   new_post=Model(username= username,contents= data.get('content'),comments=[])
   db.session.add(new_post)
   db.session.commit()
   return jsonify("added post successfully"),200

@post_bp.route('/deletePost', methods=['DELETE'])
@jwt_required()
def deletePost():
    username = get_jwt_identity()
    comm = request.args.get('comm')
    tablename = f"post_{comm}"
    Model = create_post_model(tablename)

    post_id = request.json.get('id')
    print(f"deleting post: {post_id}")
    # Check if the user owns the post
    post=db.session.query(Model).filter_by(id=post_id).first()
    if not post:
        return jsonify({'message': 'Post not found or you do not have permission'}), 404

    db.session.delete(post)
    db.session.commit()

    return jsonify({'message': 'Post deleted successfully'}), 200

@post_bp.route('/deleteComment', methods=['DELETE'])
@jwt_required()
def deleteComment():
    username = get_jwt_identity()
    comm = request.args.get('comm')
    tablename = f"post_{comm}"
    Model = create_post_model(tablename)

    post_id = request.json.get('id')
    comment_content=request.json.get('content')
    print(f"deleting comment for post: {post_id}")
    # Check if the user owns the post
    post=db.session.query(Model).filter_by(id=post_id).first()
    if not post:
        return jsonify({'message': 'Post not found or you do not have permission'}), 404
    
    new_comments = []
    print(comment_content)
    for comment in post.comments:
        if comment.get('content') != comment_content:
            new_comments.append(comment)
        elif comment.get('author')!=username:
            new_comments.append(comment)    

    post.comments = new_comments
    db.session.commit()
           

    

    return jsonify({'message': 'Comment deleted successfully'}), 200

@post_bp.route('/comment',methods=['POST'])
@jwt_required() 
def addComment():
   comm=request.args.get('comm')
   tablename=f"post_{comm}"
   Model=create_post_model(tablename)
   data = request.get_json()
   print(data)
   result=db.session.query(Model).filter_by(id=data.get('id')).first()
   comments_present=result.comments
   print(comments_present)
   print(type(comments_present))
   if comments_present is None  :
      print("None route chosen")
      new_comments=[{"author":get_jwt_identity(),"content":data.get('content')}]
      result.comments=new_comments
     
   else :
        print("not null route")
        comments_present.append({"author": get_jwt_identity(), "content": data.get('content')})
        print("Updated comments list:", comments_present)
            # Explicitly assign the modified list back to the column
        result.comments = comments_present
      # db.session.commit()
   db.session.commit()   
   return jsonify("success")  
      



   

  