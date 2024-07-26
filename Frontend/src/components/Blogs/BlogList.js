import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Header Section with Background Image
const Header = styled.div`
    background-image: url('/images/reading.jpg'); /* Replace with your image path */
    background-size: cover; /* Ensure the image covers the entire header */
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Prevent repeating of the image */
    color: white;
    padding: 4% 2%; /* Adjust padding as a percentage of the viewport */
    text-align: center;
    border-radius: 8px;
    margin-bottom: 30px;
    width: 100vw; /* Full viewport width */
    height: 90vh; /* Increased height for more space */
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center text vertically */
    
    h1 {
        font-size: 3rem; /* Increased font size */
        margin: 0;
        font-weight: bold;
        color: white; /* White text color */
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Enhanced black shadow for better readability */
    }

    p {
        font-size: 1.5rem; /* Increased font size */
        margin: 10px 0 0;
        color: white; /* White text color */
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); /* Enhanced black shadow for better readability */
    }

    @media (max-width: 768px) {
        padding: 5% 4%; /* Increase padding for smaller screens */
        height: 40vh; /* Adjust height for smaller screens */

        h1 {
            font-size: 2rem; /* Adjusted font size for smaller screens */
        }

        p {
            font-size: 1.2rem; /* Adjusted font size for smaller screens */
        }
    }
`;

// Categories Section
const CategoriesSection = styled.div`
    padding: 20px;
    background-color: #ffffff; /* Set background color to white */
    border-radius: 8px;
    margin-bottom: 30px;
`;

// Category Tabs Title
const TabsTitle = styled.h2`
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
    color: #000000; /* Black text color */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Enhanced shadow for better readability */
`;

// Category Tabs Container
const TabsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap; /* Allow wrapping of tabs on smaller screens */
`;

const CategoryTab = styled.div`
    flex: 1;
    margin: 0 10px;
    text-align: center;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, box-shadow 0.3s;
    max-width: 250px; /* Increased max-width */
    height: 100px; /* Increased height */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; /* Set position to relative for positioning child elements */
    overflow: hidden; /* Ensure content doesn't overflow */

    &:hover {
        background-color: #e9ecef;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    img {
        position: absolute; /* Position image absolutely */
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; /* Ensure image covers the area */
        z-index: 0; /* Place image behind text */
    }

    h3 {
        position: relative; /* Position text relative to parent */
        z-index: 1; /* Place text in front of image */
        color: white; /* Text color */
        font-size: 1.4rem; /* Adjust font size for larger tabs */
        margin: 0;
        padding: 10px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Shadow for better readability */
    }
`;

// Blog Section Container
const BlogSection = styled.div`
    background-image: url('/images/bloglistbg.avif'); /* Replace with your calming image path */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 40px 20px;
    border-radius: 8px;
    margin-bottom: 30px;
`;

const BlogSectionTitle = styled.h2`
       text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
    color: #000000; /* Black text color */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Enhanced shadow for better readability */
`;

// Blog List Container and Items
const BlogListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive grid layout */
    gap: 20px; /* Space between items */
`;

const BlogItem = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, box-shadow 0.3s;

    &:hover {
        background-color: #e9ecef;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
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

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('/blogCat?param1=mental health');
            const data = await response.json();
            setBlogs(data);
        };

        fetchBlogs();
    }, []);

    return (
        <>
            <Header>
                <h1>Welcome to Your Mental Health Resource</h1>
                <p>Explore our articles and find comfort in understanding and managing your mental health.</p>
            </Header>
            <CategoriesSection>
                <TabsTitle>Search by Categories</TabsTitle>
                <TabsContainer>
                    <CategoryTab>
                        <img src="/images/categorytab.jpg" alt="Anxiety" /> {/* Replace with your image path */}
                        <h3>Anxiety</h3>
                    </CategoryTab>
                    <CategoryTab>
                        <img src="/images/categorytab.jpg" alt="Depression" /> {/* Replace with your image path */}
                        <h3>Depression</h3>
                    </CategoryTab>
                    <CategoryTab>
                        <img src="/images/categorytab.jpg" alt="Mindfulness" /> {/* Replace with your image path */}
                        <h3>Mindfulness</h3>
                    </CategoryTab>
                    <CategoryTab>
                        <img src="/images/categorytab.jpg" alt="Sleep" /> {/* Replace with your image path */}
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
                                <BlogTitle>{blog.title}</BlogTitle>
                            </BlogLink>
                        </BlogItem>
                    ))}
                </BlogListContainer>
            </BlogSection>
        </>
    );
};

export default BlogList;
