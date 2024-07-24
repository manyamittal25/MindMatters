import pandas as pd
import numpy as np
# from app import db
from app.models.blog import Blog
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Initialize the TfidfVectorizer
def computer():
    tfidf = TfidfVectorizer(stop_words="english")

# Build the DataFrame from the database
    blogs_data=Blog.query.all()
    blogs_list = [
        {
            'id': blog.id,
            'summary':blog.summary,
        } for blog in blogs_data
    ]
    
    # Create a pandas DataFrame from the list of dictionaries
    df = pd.DataFrame(blogs_list)

# Fit and transform the content of the blogs to the TF-IDF matrix
    tfidf_matrix = tfidf.fit_transform(df['summary'])

# Ensure the matrix is of type float32
    tfidf_matrix = tfidf_matrix.astype(np.float32)

# Compute the cosine similarity matrix
    cosine_sim_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)

# Create a DataFrame to hold the cosine similarity matrix with IDs as indices and columns
    cosine_sim_df = pd.DataFrame(cosine_sim_matrix, index=df['id'], columns=df['id'])

# Print the shape of the cosine similarity matrix
    print(cosine_sim_df.shape)

# Optionally, print the cosine similarity matrix
    print(cosine_sim_df)

# Save the cosine similarity matrix to a CSV file for later use
    cosine_sim_df.to_csv('cosine_similarity_matrix.csv')
    return 