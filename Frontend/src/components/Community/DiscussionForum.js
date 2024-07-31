// components/DiscussionForum.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BACKEND_URL } from '../../urls';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Container for the entire forum page
const ForumContainer = styled.div`
    background-color: #f0f8e2; /* Light lime yellow color */
    min-height: 100vh;
    padding: 20px;
    display: flex;
    gap: 20px; /* Space between columns */
`;

// Container for the "Create Your Own Post" section
const CreatePostContainer = styled.div`
    flex: 1;
    max-width: 400px; /* Limit width */
    background-color: #ffffff; /* White background */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for separation */
    text-align: left;
`;

// Header for the create post section
const CreatePostHeader = styled.h2`
    color: #003366; /* Dark blue color */
    font-size: 1.5rem;
    margin-bottom: 20px;
`;

// Container for the forum posts
const ForumContentContainer = styled.div`
    flex: 2;
    background-color: #ffffff; /* White background */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for separation */
    width: 100%; /* Make sure it takes up available space */
    max-width: 1200px; /* Adjust max-width as needed */
    text-align: left;
`;

// Header for the forum
const ForumHeader = styled.h1`
    color: #003366; /* Dark blue color */
    font-size: 2.5rem;
    margin-bottom: 20px;
`;

// Container for individual posts
const PostContainer = styled.div`
    background-color: #ffffff; /* White background for posts */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for separation */
    margin-bottom: 20px;
    text-align: left;
`;

// Post author and content styling
const PostAuthor = styled.h2`
    color: #003366; /* Dark blue color */
    font-size: 1.5rem;
    margin-bottom: 10px;
`;

const PostContent = styled.p`
    color: #003366; /* Dark blue color */
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 20px;
`;

// Container for comments
const CommentsContainer = styled.div`
    margin-top: 20px;
`;

// Individual comment styling
const Comment = styled.div`
    background-color: #ffffff; /* White background for comments */
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for separation */
    margin-bottom: 10px;
    text-align: left;
`;

const CommentAuthor = styled.h4`
    color: #003366; /* Dark blue color */
    font-size: 1rem;
    margin-bottom: 5px;
`;

const CommentContent = styled.p`
    color: #003366; /* Dark blue color */
    font-size: 0.9rem;
    line-height: 1.4;
`;

// Comment form styling
const CommentForm = styled.form`
    margin-top: 20px;
    text-align: left;
`;

const CommentInput = styled.textarea`
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    font-size: 1rem;
    line-height: 1.4;
    resize: vertical;
`;

const SubmitButton = styled.button`
    background-color: #003366; /* Dark blue color */
    color: #ffffff; /* White text */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #002244; /* Slightly darker blue */
    }
`;

// Create Post Form styling
const CreatePostForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const PostTitleInput = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
`;

const PostContentInput = styled.textarea`
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    line-height: 1.4;
    resize: vertical;
`;

const DiscussionForum = () => {
    const [posts, setPosts] = useState([]); // State to manage posts
    const [newComment, setNewComment] = useState(''); // State for new comment input
    const [newPostTitle, setNewPostTitle] = useState(''); // State for new post title
    const [newPostContent, setNewPostContent] = useState(''); // State for new post content
    const [selectedPostId, setSelectedPostId] = useState(null); // State to manage selected post for commenting
    const [loggedIn, setLoggedIn] = useState(false)
    const [changeFlag, setChangeFlag] = useState(true)
    const token = localStorage.getItem('jwtToken')
    const [currentUser, setCurrentUser] = useState("")


    const { comm } = useParams();
    console.log(`user is:${comm}`)
    // Fetch posts from the backend (mocked here)
    //     useEffect(() => {
    //         // Replace this with your actual fetch request

    //         const fetchPosts = async () => {


    //             // Example data, replace with real fetch call


    //             // const data = [
    //             //     {
    //             //         id: 1,
    //             //         author: 'Jane Doe',
    //             //         content: 'This is an example of a post content. Share your thoughts and experiences here.',
    //             //         comments: [
    //             //             { author: 'John Smith', content: 'Great post!' },
    //             //             { author: 'Alice Brown', content: 'I totally agree with you.' }
    //             //         ]
    //             //     },
    //             //     {
    //             //         id: 2,
    //             //         author: 'Jane Doe',
    //             //         content: 'This is another example of a post content. Share your thoughts and experiences here.',
    //             //         comments: [
    //             //             { author: 'John Smith', content: 'Great post!' },
    //             //             { author: 'Alice Brown', content: 'I totally agree with you.' }
    //             //         ]
    //             //     }
    //             // ];

    //        useEffect(() => {
    //   const fetchPosts = async () => {
    //     try {
    //       const response = await fetch(`${BACKEND_URL}comm/getPosts?${comm}`);
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    //       const data = await response.json();
    //       setPosts(data);
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   };

    //   fetchPosts();   

    // }, [comm]);

    //             setPosts(data);
    //         };

    //         fetchPosts();
    //     }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}comm/getPosts?comm=${comm}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const getUsername = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}auth/getUser`, {
                    method: 'GET', // Specify the method
                    headers: {
                        'Content-Type': 'application/json', // Set the content type to JSON
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // console.log(data)
                setCurrentUser(data.username);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPosts();
        if (token) {
            setLoggedIn(true);
            getUsername();
        }

    }, [comm, changeFlag]);

    const handleDeleteComment = async (id, content) => {
        console.log(content)
        try {
            const response = await fetch(`${BACKEND_URL}comm/deleteComment?comm=${comm}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    content: content
                })
            });

            if (!response.ok) {
                throw new
                    Error('Failed to delete post');
            }

            const data = await response.json();
            console.log(data); // Handle success response
            changeFlag ? setChangeFlag(false) : setChangeFlag(true)
        } catch (error) {
            console.error(error); // Handle error
        }
    }

    const handleDeletePost = async (id) => {
        try {
            const response = await fetch(`${BACKEND_URL}comm/deletePost?comm=${comm}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            });

            if (!response.ok) {
                throw new
                    Error('Failed to delete post');
            }

            const data = await response.json();
            console.log(data); // Handle success response
            changeFlag ? setChangeFlag(false) : setChangeFlag(true)
        } catch (error) {
            console.error(error); // Handle error
        }
    }

    // Handle comment input change
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    // Handle comment form submission
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (selectedPostId !== null) {
            // Add new comment to the selected post (mocked here)
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === selectedPostId
                        ? {
                            ...post,
                            comments: [...post.comments, { author: 'Anonymous', content: newComment }]
                        }
                        : post
                )
            );
            setNewComment('');
        }
    };

    const handleCommentSubmit2 = (e) => {
        e.preventDefault();
        console.log("comment submit triggered")
        if (selectedPostId !== null) {
            // Add new comment to the selected post (mocked here)
            const data = {
                id: selectedPostId,
                content: newComment
            }
            console.log(data)
            fetch(`${BACKEND_URL}comm/comment?comm=${comm}`, {
                method: 'POST', // Specify the method
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data) // Convert the data object to a JSON string
            })
                .then(response => {
                    if (!response.ok) {
                        // Handle HTTP errors
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse the JSON response
                })
                .then(responseData => {
                    // Handle the response data
                    console.log('Success:', responseData);
                    changeFlag ? setChangeFlag(false) : setChangeFlag(true)

                    setNewComment('');
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error:', error);
                });

        }
    };
    // Handle new post form submission
    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (newPostTitle && newPostContent) {
            // Add new post (mocked here)
            setPosts((prevPosts) => [
                ...prevPosts,
                {
                    id: prevPosts.length + 1,
                    author: 'Anonymous', // Or use a real author name
                    content: newPostContent,
                    comments: []
                }
            ]);
            setNewPostTitle('');
            setNewPostContent('');
        }
    };

    const handlePostSubmit2 = (e) => {
        console.log("post submit triggered")
        e.preventDefault();
        if (newPostContent) {
            // Add new post (mocked here)
            const data = {
                id: posts.length + 1,
                content: newPostContent
            }
            fetch(`${BACKEND_URL}comm/addPost?comm=${comm}`, {
                method: 'POST', // Specify the method
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data) // Convert the data object to a JSON string
            })
                .then(response => {
                    if (!response.ok) {
                        // Handle HTTP errors
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse the JSON response
                })
                .then(responseData => {
                    // Handle the response data
                    console.log('Success:', responseData);
                    changeFlag ? setChangeFlag(false) : setChangeFlag(true)

                    setNewPostContent('');
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error:', error);
                });


        }
    };

    console.log(currentUser)

    return (
        <ForumContainer>
            {/* Create Post Section */}
            {loggedIn && (<CreatePostContainer>
                <CreatePostHeader>Create Your Own Post</CreatePostHeader>
                <CreatePostForm onSubmit={handlePostSubmit2}>
                    {/* <PostTitleInput
                        type="text"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="Post Title"
                    /> */}
                    <PostContentInput
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Write your post here..."
                        rows="6"
                    />
                    <SubmitButton type="submit">Submit Post</SubmitButton>
                </CreatePostForm>
            </CreatePostContainer>)}

            {/* Forum Posts Section */}
            <ForumContentContainer>
                <ForumHeader>Discussion Forum</ForumHeader>
                {posts.map((post) => (
                    <PostContainer key={post.id}>
                        <PostAuthor>{post.username}</PostAuthor>
                        <PostContent>{post.contents}</PostContent>
                        <CommentsContainer>
                            {post.comments.map((comment, index) => (
                                <Comment key={index}>
                                    <CommentAuthor>{comment.author}</CommentAuthor>
                                    <CommentContent>{comment.content}</CommentContent>
                                    {comment.author === currentUser && <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        onClick={() => handleDeleteComment(post.id, comment.content)}
                                        style={{ cursor: 'pointer', color: '#e74c3c' }}
                                    />}
                                </Comment>
                            ))}
                            {loggedIn && selectedPostId === post.id && (
                                <CommentForm onSubmit={handleCommentSubmit2}>
                                    <CommentInput
                                        value={newComment}
                                        onChange={handleCommentChange}
                                        placeholder="Write a comment..."
                                        rows="4"
                                    />
                                    <SubmitButton type="submit">Submit Comment</SubmitButton>
                                </CommentForm>
                            )}
                            {loggedIn && (<SubmitButton onClick={() => setSelectedPostId(selectedPostId === post.id ? null : post.id)}>
                                {selectedPostId === post.id ? 'Hide Comment Form' : 'Add Comment'}
                            </SubmitButton>)}
                        </CommentsContainer>
                        {loggedIn && post.username == currentUser && (<FontAwesomeIcon
                            icon={faTrashAlt}
                            onClick={() => handleDeletePost(post.id)}
                            style={{ cursor: 'pointer', color: '#e74c3c' }}
                        />)}
                    </PostContainer>
                ))}
            </ForumContentContainer>
        </ForumContainer>
    );
};

export default DiscussionForum;

