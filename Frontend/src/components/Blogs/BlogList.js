import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BACKEND_URL } from '../../urls';

// Header Section with Background Image
const Header = styled.div`
    background-image: url('/images/reading.jpg'); /* Replace with your image path */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    padding: 4% 2%;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 30px;
    width: 100vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    h1 {
        font-size: 3rem;
        margin: 0;
        font-weight: bold;
        color: white;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    p {
        font-size: 1.5rem;
        margin: 10px 0 0;
        color: white;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 768px) {
        padding: 5% 4%;
        height: 40vh;

        h1 {
            font-size: 2rem;
        }

        p {
            font-size: 1.2rem;
        }
    }
`;

// Background Wrapper for Categories and Blog Sections
const BackgroundWrapper = styled.div`
    background-image: url('/images/bloglistbg.avif'); /* Background image */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 40px 20px;
    border-radius: 8px;
    margin-bottom: 30px;
`;

// Categories Section
const CategoriesSection = styled.div`
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    margin-bottom: 30px;
`;

// Category Tabs Title
const TabsTitle = styled.h2`
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
    color: #000000;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;

// Category Tabs Container
const TabsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const CategoryTab = styled.div`
    flex: 1;
    margin: 0 10px;
    text-align: center;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, box-shadow 0.3s;
    max-width: 250px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    &:hover {
        background-color: #e9ecef;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
    }

    h3 {
        position: relative;
        z-index: 1;
        color: black;
        font-size: 1.4rem;
        margin: 0;
        padding: 10px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
    }
`;

// Blog Section Container
const BlogSection = styled.div`
    padding: 40px 20px;
    border-radius: 8px;
    margin-bottom: 30px;
`;

const BlogSectionTitle = styled.h2`
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
    color: #000000;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;

// Blog List Container and Items
const BlogListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 cards per row */
    gap: 30px;
`;

const BlogItem = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, box-shadow 0.3s;
    overflow: hidden;

    &:hover {
        background-color: #e9ecef;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

const BlogImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 15px;
`;

const BlogMeta = styled.div`
    margin-bottom: 15px;
    color: #555;
`;

const BlogAuthor = styled.p`
    margin: 0;
    font-weight: bold;
`;

const BlogDate = styled.p`
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

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [category, setCategory] = useState('mental-health')
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(`${BACKEND_URL}blogCat?param1=${category}`);
            const data = await response.json();
            setBlogs(data);
        };

        fetchBlogs();
    }, [category]);

    const handleCat = (cat) => {
        setCategory(cat)
    }

    return (
        <>
            <Header>
                <h1>Welcome to Your Mental Health Resource</h1>
                <p>Explore our articles and find comfort in understanding and managing your mental health.</p>
            </Header>
            <BackgroundWrapper>
                <CategoriesSection>
                    <TabsTitle>Search by Categories</TabsTitle>
                    <TabsContainer>
                        <CategoryTab>
                            <img src="/images/categorytab.jpg" alt="Anxiety" onClick={() => handleCat('anxiety')} />
                            {/* Replace with your image path */}
                            <h3>Anxiety</h3>
                        </CategoryTab>
                        <CategoryTab>
                            <img src="/images/categorytab.jpg" alt="Depression" onClick={() => handleCat('Depression')} /> {/* Replace with your image path */}
                            <h3>Depression</h3>
                        </CategoryTab>
                        <CategoryTab>
                            <img src="/images/categorytab.jpg" alt="Mindfulness" onClick={() => handleCat('mindfulness')} /> {/* Replace with your image path */}
                            <h3>Mindfulness</h3>
                        </CategoryTab>
                        <CategoryTab>
                            <img src="/images/categorytab.jpg" alt="Sleep" onClick={() => handleCat('sleep')} /> {/* Replace with your image path */}
                            <h3>Sleep</h3>
                        </CategoryTab>
                    </TabsContainer>
                </CategoriesSection>
                <BlogSection>
                    <BlogSectionTitle>Blogs/Articles</BlogSectionTitle>
                    <BlogListContainer>
                        {blogs.map(blog => (
                            <BlogItem key={blog.id}>
                                <BlogLink to={`/blog/${blog.id}`}>
                                    <BlogImage src={blog.image} alt={blog.title} /> {/* Add blog image */}
                                    <BlogTitle>{blog.title}</BlogTitle>
                                    <BlogMeta>
                                        <BlogAuthor>Author: {blog.author}</BlogAuthor>
                                        <BlogDate>Upload Date: {new Date(blog.upload_date).toLocaleDateString()}</BlogDate> {/* Format date */}
                                    </BlogMeta>
                                </BlogLink>
                            </BlogItem>
                        ))}
                    </BlogListContainer>
                </BlogSection>
            </BackgroundWrapper>
        </>
    );
};

export default BlogList;
