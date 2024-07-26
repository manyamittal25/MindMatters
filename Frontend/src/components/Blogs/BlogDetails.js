// src/components/blogs/BlogDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const BlogDetailsContainer = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #fff;
    color: #333;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RelatedBlogs = styled.div`
    margin-top: 20px;
`;

const RelatedBlogItem = styled.li`
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;

    a {
        text-decoration: none;
        color: #007bff;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch(`/blogId?id=${id}`);
            const data = await response.json();
            setBlog(data[0]);
        };

        const fetchRelatedBlogs = async () => {
            const response = await fetch(`/simToBlogId?id=${id}`);
            const data = await response.json();
            setRelatedBlogs(data);
        };

        fetchBlog();
        fetchRelatedBlogs();
    }, [id]);

    return (
        <BlogDetailsContainer>
            {blog && (
                <>
                    <h1>{blog.title}</h1>
                    <p>{blog.content}</p>
                    <h3>Author: {blog.author}</h3>
                    <h4>Upload Date: {blog.upload_date}</h4>
                    <h5>Likes: {blog.likes}</h5>
                </>
            )}
            <RelatedBlogs>
                <h2>Related Blogs</h2>
                <ul>
                    {relatedBlogs.map(rBlog => (
                        <RelatedBlogItem key={rBlog.id}>
                            <Link to={`/blog/${rBlog.id}`}>
                                <h3>{rBlog.title}</h3>
                                <p>Author: {rBlog.author}</p>
                                <p>Likes: {rBlog.likes}</p>
                            </Link>
                        </RelatedBlogItem>
                    ))}
                </ul>
            </RelatedBlogs>
        </BlogDetailsContainer>
    );
};

export default BlogDetails;
