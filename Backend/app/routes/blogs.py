from flask import Blueprint, jsonify, request, redirect, url_for
import requests
from datetime import datetime
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
from .. import db
from ..models.blog import Blog
from ..computeBlogs import computer
import google.generativeai as genai

blog_bp = Blueprint('blog', __name__)

def getSummary(content):
    # print("api keys:",config.GENAI_API_KEY)
    genai.configure(api_key=os.environ.get('GENAI_API_KEY'))
    # Choose a model that's appropriate for your use case.
    model = genai.GenerativeModel('gemini-1.5-flash')

    prompt = 'Break the content of this blog into some keywords seperated by commas:' + content
    
    response = model.generate_content(prompt)
    return response.text


@blog_bp.route('/blogCat', methods=['GET'])
def getByCat():
    computer()
    category = request.args.get('param1')
    blogs_data=Blog.query.limit(100).all()
    blogs_list = [
        {
            'id': blog.id,
            'title': blog.title,
            'content': blog.content,
            'upload_date': blog.upload_date,
            'summary':blog.summary,
            'author':blog.author,
            'likes':blog.likes
        } for blog in blogs_data
    ]
    
    # Create a pandas DataFrame from the list of dictionaries
    df = pd.DataFrame(blogs_list)
    combined_content = df['summary'].tolist() + [category]
    tfidf = TfidfVectorizer(stop_words="english")
    tfidf_matrix = tfidf.fit_transform(df['summary'])

    tfidf_matrix = tfidf.fit_transform(combined_content)
    
    print(tfidf_matrix.shape)
    
    tfidf_matrix = tfidf_matrix.astype(np.float32)
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    print(cosine_sim.shape)
    
    # Get the index of the last item (the category) in the TF-IDF matrix
    category_index = tfidf_matrix.shape[0] - 1
    
    # Compute similarity scores with respect to the category
    similarity_scores = pd.DataFrame(cosine_sim[category_index, :-1], columns=["score"])
    similarity_scores['index'] = similarity_scores.index
    
    # Merge similarity scores with the original DataFrame
    df['score'] = similarity_scores['score']
    
    # Sort DataFrame by similarity score in descending order
    df_sorted = df.sort_values(by='score', ascending=False).reset_index(drop=True)
    
    # Convert the sorted DataFrame to JSON
    result_json = df_sorted.to_json(orient='records')
    
    return result_json

@blog_bp.route('/simToBlogId', methods=['GET'])
def get_most_related_articles(top_n=10):
    article_id=int(request.args.get('id'))
    # Load the cosine similarity matrix from the CSV file
    cosine_sim_df = pd.read_csv('cosine_similarity_matrix.csv', index_col=0)
    print(type(article_id))
    for x in cosine_sim_df.index:
        print(type(x))
    if article_id not in cosine_sim_df.index:
        return f"Article ID {article_id} not found in the matrix."
    
    # Fetch the similarity scores for the given article ID
    similarity_scores = cosine_sim_df.loc[article_id]
    
    # Sort the scores in descending order and exclude the self-similarity
    most_similar = similarity_scores.sort_values(ascending=False)
    
    # Get the top N similar articles (excluding the article itself)
    top_similar_ids = most_similar[most_similar.index != article_id].head(top_n).index.tolist()
    print(top_similar_ids)
    data=[]
    for i in top_similar_ids:
        if i==article_id:
            continue
        blog=Blog.query.filter_by(id=i).first()
        data.append({
            'id': blog.id,
            'title': blog.title,
            'author':blog.author,
            'likes':blog.likes
        } )


    return jsonify(data)

@blog_bp.route('/blogId',methods=['GET'])
def getById():
    blogId=request.args.get('id')
    blog=Blog.query.filter_by(id=blogId).first()
    return jsonify([{
            'id': blog.id,
            'title': blog.title,
            'content': blog.content,
            'upload_date': blog.upload_date,
            'summary':blog.summary,
            'author':blog.author,
            'likes':blog.likes
    }])

@blog_bp.route('/createBlog',methods=['POST'])
def postBlog():
    # if(os.path.exists('cosine_similarity_matrix.csv')==False):
    #     computer()

    # cosine_sim_df = pd.read_csv('cosine_similarity_matrix.csv', index_col=0)
    

# Load existing blogs
    blogs_data=Blog.query.limit(100).all()
    blogs_list = [
        {
            'id': blog.id,
            'summary':blog.summary,
        } for blog in blogs_data
    ]
    df_existing = pd.DataFrame(blogs_list)

# Define the new blog's ID and content
    data = request.get_json()
    
    new_blog_content = data.get('content')
    new_blog_summary=getSummary(new_blog_content)
    new_blog_author=data.get('author')
    new_blog_title=data.get('title')

    new_blog= Blog(content=new_blog_content,summary=new_blog_summary,author=new_blog_author,title=new_blog_title,upload_date=datetime.now().date())
    db.session.add(new_blog)
    db.session.commit()
    computer()
    return jsonify('blog added successfully'),200

    

# # Create a DataFrame for the new blog
#     new_blog_df = pd.DataFrame({
#     'id': [new_blog_id],
#     'summary': [new_blog_summary]
# })

# # Combine existing and new blogs
#     df_combined = pd.concat([df_existing, new_blog_df], ignore_index=True)

# # Initialize TF-IDF Vectorizer and fit_transform on the combined DataFrame
#     tfidf = TfidfVectorizer(stop_words="english")
#     tfidf_matrix = tfidf.fit_transform(df_combined['summary'])

# # Separate TF-IDF matrix for existing and new blogs
#     existing_tfidf_matrix = tfidf_matrix[:-1]
#     new_blog_tfidf_vector = tfidf_matrix[-1]

# # Compute similarity of new blog with existing blogs
#     new_blog_similarities = cosine_similarity(new_blog_tfidf_vector, existing_tfidf_matrix).flatten()

# # Convert the new similarities into a DataFrame
#     new_blog_sim_df = pd.DataFrame([np.append(existing_tfidf_matrix.toarray(), new_blog_tfidf_vector.toarray(), axis=0)],
#                                index=[new_blog_id],
#                                columns=cosine_sim_df.columns.append(pd.Index([new_blog_id])))

# # Update the existing matrix with the new blog's similarities
#     updated_cosine_sim_df = pd.concat([cosine_sim_df, new_blog_sim_df], axis=0, join='outer')
#     updated_cosine_sim_df = pd.concat([updated_cosine_sim_df, updated_cosine_sim_df.T], axis=1, join='outer')
#     updated_cosine_sim_df = updated_cosine_sim_df.fillna(0)  # Fill any NaN values with 0

# # Save the updated cosine similarity matrix to a CSV file
#     updated_cosine_sim_df.to_csv('cosine_similarity_matrix.csv')

#     print("Updated cosine similarity matrix saved successfully.")


    
    