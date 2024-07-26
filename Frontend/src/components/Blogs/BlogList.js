// src/components/blogs/BlogList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BlogListContainer = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    color: #333;
`;

const BlogItem = styled.div`
    margin-bottom: 20px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, box-shadow 0.3s;

    &:hover {
        background-color: #f1f1f1;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
`;

const BlogTitle = styled.h2`
    color: #007bff;
`;

const BlogLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:hover {
        text-decoration: underline;
    }
`;

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('/blogCat?param1=mental health');
            const data = await response.json();
            setBlogs(data);
        };

        fetchBlogs();
    }, []);

    return (
        <BlogListContainer>
            <h1>Blog List</h1>
            {blogs.map(blog => (
                <BlogItem key={blog.id}>
                    <BlogLink to={`/blog/${blog.id}`}>
                        <BlogTitle>{blog.title}</BlogTitle>
                    </BlogLink>
                </BlogItem>
            ))}
        </BlogListContainer>
    );
};

export default BlogList;
