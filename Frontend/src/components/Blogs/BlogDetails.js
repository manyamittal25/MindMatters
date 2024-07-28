import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { GrLike } from 'react-icons/gr';
import { BACKEND_URL } from '../../urls';
import axios from 'axios'
const BlogDetailsContainer = styled.div`
    padding: 40px 20px;
    font-family: Arial, sans-serif;
    background-color: #ffffff;
    color: #333;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;

    h2 {
        color: #007bff;
        margin-bottom: 10px;
    }

    p {
        margin-bottom: 20px;
        white-space: pre-line; 
    }

    h3, h4, h5 {
        margin: 10px 0;
    }
`;


// Like Button
const LikeButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
        background-color: #0056b3;
    }

    // &:disabled {
    //     background-color: #ccc;
    //     // cursor: not-allowed;
    // }
`;

// Related Blogs Section
const BlogSection = styled.div`
    padding: 40px 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    background-color: #f8f9fa; /* Match the background color of BlogList */
`;

const BlogSectionTitle = styled.h2`
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
    color: #000000;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;

const BlogListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 cards per row */
    gap: 30px;
`;

const RelatedBlogItem = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, box-shadow 0.3s;
    overflow: hidden;
    margin-bottom: 20px;

    &:hover {
        background-color: #e9ecef;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

const RelatedBlogImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 15px;
`;

const RelatedBlogMeta = styled.div`
    margin-bottom: 15px;
    color: #555;
`;

const RelatedBlogAuthor = styled.p`
    margin: 0;
    font-weight: bold;
`;

const RelatedBlogLikes = styled.p`
    margin: 0;
    color: #777;
`;

const BlogTitle = styled.h2`
    color: #007bff;
    margin-bottom: 10px;
`;

const BlogLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:hover {
        text-decoration: underline;
    }
`;

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [likeToggle, setLikeToggle] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)



    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch(`${BACKEND_URL}blogId?id=${id}`);
            const data = await response.json();
            setBlog(data[0]);
            setLikes(data[0].likes);
        };

        const fetchRelatedBlogs = async () => {
            const response = await fetch(`${BACKEND_URL}simToBlogId?id=${id}`);
            const data = await response.json();
            setRelatedBlogs(data);
        };

        const fetchLikeStatus = async () => {
            const token = localStorage.getItem('jwtToken')
            const response = await axios.get(`${BACKEND_URL}hasLiked?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.data;
            console.log(data)
            setHasLiked(data)
            // setLikes(data[0].likes);
        };
        const hasToken = !!localStorage.getItem('jwtToken');
        console.log(hasToken)
        if (hasToken) {
            fetchLikeStatus();
            setLoggedIn(true)
        }

        fetchBlog();
        fetchRelatedBlogs();
    }, [id, likeToggle]);

    // useEffect(() => {
    //     const fetchLikeStatus = async () => {
    //         const response = await fetch(`${BACKEND_URL}hasLiked?id=${id}`);
    //         const data = await response.json();
    //         console.log(`rcvd like data: ${data}`)
    //         setLikes(data[0].likes);
    //     };

    //     const fetchRelatedBlogs = async () => {
    //         const response = await fetch(`${BACKEND_URL}simToBlogId?id=${id}`);
    //         const data = await response.json();
    //         setRelatedBlogs(data);
    //     };

    //     fetchBlog();
    //     fetchRelatedBlogs();
    // }, [id]);

    const handleLike = async () => {
        // if (hasLiked) return;

        const token = localStorage.getItem('jwtToken')
        const response = await fetch(`${BACKEND_URL}/likedBlog?id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response)
        // if (response.ok) {
        //     setLikes(prevLikes => prevLikes + 1);
        //     setHasLiked(true);
        // }
        likeToggle ? setLikeToggle(false) : setLikeToggle(true)
    };

    return (
        <>
            <BlogDetailsContainer>
                {blog && (
                    <>
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                        <br />
                        <h3>Author: {blog.author}</h3>
                        <h4>Upload Date: {new Date(blog.upload_date).toLocaleDateString()}</h4>
                        <h5>Likes: {likes}</h5>
                        {/* < LikeButton onClick={handleLike} disabled={hasLiked}> */}
                        {loggedIn && (<LikeButton onClick={handleLike} >
                            <GrLike color={hasLiked ? '#ff0000' : '#ffffff'} />
                            {hasLiked ? 'Liked' : 'Like'}
                        </LikeButton>)}
                    </>
                )}
            </BlogDetailsContainer>
            <BlogSection>
                <BlogSectionTitle>Related Blogs</BlogSectionTitle>
                <BlogListContainer>
                    {relatedBlogs.map(rBlog => (
                        <RelatedBlogItem key={rBlog.id}>
                            <BlogLink to={`/blog/${rBlog.id}`}>
                                <RelatedBlogImage src={rBlog.imagelink} alt={rBlog.title} />
                                <BlogTitle>{rBlog.title}</BlogTitle>
                                <RelatedBlogMeta>
                                    <RelatedBlogAuthor>Author: {rBlog.author}</RelatedBlogAuthor>
                                    <RelatedBlogLikes>Likes: {rBlog.likes}</RelatedBlogLikes>
                                </RelatedBlogMeta>
                            </BlogLink>
                        </RelatedBlogItem>
                    ))}
                </BlogListContainer>
            </BlogSection>
        </>
    );
};

export default BlogDetails;
