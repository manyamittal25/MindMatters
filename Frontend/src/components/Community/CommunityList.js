import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Container for the entire page with background color
const PageContainer = styled.div`
    background-color: #f0f8e2; /* Light lime yellow color */
    min-height: 100vh; /* Ensures the background covers the full height of the viewport */
    padding: 20px;
`;

// Header Section with Background Image
const Header = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 40px;

    .text {
        color: #003366; /* Very dark blue color */
        margin-top: 60px; /* Moved text down */
        margin-bottom: 20px;
    }

    .text h1 {
        font-size: 2.5rem;
        margin: 0;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .text p {
        font-size: 1.2rem;
        margin: 10px 0 0;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    .image-container {
        background-image: url('/images/communitylist.jpg'); /* Replace with your image path */
        background-size: cover; /* Cover the entire container */
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        height: 60vh; /* Adjust height as needed */
        border-radius: 8px;
        max-width: 1200px; /* Optional: Set a max-width for larger screens */
        max-height: 500px; /* Optional: Set a max-height for larger screens */
        object-fit: cover;
    }

    @media (max-width: 768px) {
        .text h1 {
            font-size: 1.8rem;
        }

        .text p {
            font-size: 1rem;
        }

        .image-container {
            width: 90%;
            height: 35vh;
        }
    }

    @media (max-width: 480px) {
        .text h1 {
            font-size: 1.5rem;
        }

        .text p {
            font-size: 0.9rem;
        }

        .image-container {
            height: 25vh;
        }
    }
`;

// Section for the "What Our Community Offers"
const CommunityOffers = styled.section`
    width: 100%; /* Full width of the viewport */
    padding: 30px 20px;
    background-color: #ffffff; /* Plain white background */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow for separation */
    display: flex;
    flex-direction: row;
    gap: 20px; /* Space between image and text */
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column; /* Stack image and text vertically on smaller screens */
        gap: 10px; /* Reduced space between image and text */
    }
`;

const ImageContainer = styled.div`
    flex: 1;
    background-image: url('/images/communityoffers.webp'); /* Replace with your image path */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 400px; /* Adjust height as needed */
    border-radius: 8px;
`;

const TextContainer = styled.div`
    flex: 2; /* Takes up more space than the image */
    color: #003366; /* Dark blue color */

    h2 {
        font-size: 2rem; /* Reduced font size */
        margin-bottom: 20px;
        font-weight: bold;
    }

    p {
        font-size: 1rem; /* Reduced font size */
        line-height: 1.6;
        margin: 0;
        margin-bottom: 15px; /* Added spacing between paragraphs */
    }

    @media (max-width: 768px) {
        h2 {
            font-size: 1.6rem; /* Adjusted font size for smaller screens */
        }

        p {
            font-size: 0.9rem; /* Adjusted font size for smaller screens */
        }
    }

    @media (max-width: 480px) {
        h2 {
            font-size: 1.4rem;
        }

        p {
            font-size: 0.8rem;
        }
    }
`;

// Section for "Join Our Communities"
const JoinCommunities = styled.section`
    width: 100%; /* Full width of the viewport */
    padding: 30px 20px;
    background-color: #f0f8e2; /* Light lime yellow color */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow for separation */
    text-align: center;

    h2 {
        font-size: 2rem; /* Reduced font size */
        color: #003366; /* Dark blue color */
        margin-bottom: 30px;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        h2 {
            font-size: 1.6rem; /* Adjusted font size for smaller screens */
        }
    }

    @media (max-width: 480px) {
        h2 {
            font-size: 1.4rem;
        }
    }
`;

const CommunityListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px; /* Space between community items */
    align-items: center;

    .community-item {
        background-color: #ffffff; /* White background for community items */
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for separation */
        width: 90%; /* Adjust width as needed */
        max-width: 1000px; /* Optional: Set a max-width for larger screens */
        text-align: center; /* Center text and content */

        .community-name {
            font-size: 1.5rem; /* Reduced font size */
            color: #003366; /* Dark blue color */
            margin-bottom: 15px; /* Space below the community name */
            font-weight: bold;
        }

        .community-details {
            display: flex;
            align-items: center;
            gap: 15px; /* Space between image and description */
            margin-bottom: 15px; /* Space below the details section */
        }

        .community-image {
            flex: 1;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 150px; /* Adjust height as needed */
            border-radius: 8px;
        }

        .community-description {
            flex: 2; /* Takes up more space than the image */
            text-align: left;
            font-size: 0.9rem; /* Reduced font size */
            line-height: 1.6;
            color: #003366; /* Dark blue color */
        }

        .join-button {
            background-color: #003366; /* Dark blue color */
            color: #ffffff; /* White text */
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            font-size: 0.9rem; /* Reduced font size */
            cursor: pointer;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: #002244; /* Slightly darker blue */
            }
        }
    }

    @media (max-width: 768px) {
        .community-item {
            width: 95%; /* Adjust width for smaller screens */
        }
    }

    @media (max-width: 480px) {
        .community-item {
            width: 100%; /* Full width for mobile screens */
        }

        .community-details {
            flex-direction: column; /* Stack image and description vertically on smaller screens */
        }

        .community-image {
            height: 120px; /* Adjust height for smaller screens */
        }

        .community-description {
            font-size: 0.8rem; /* Adjust font size for smaller screens */
        }

        .join-button {
            font-size: 0.8rem; /* Adjust font size for smaller screens */
            padding: 6px 12px; /* Adjust padding for smaller screens */
        }
    }
`;

const CommunityList = () => {
    return (
        <>
            <PageContainer>
                <Header>
                    <div className="text">
                        <h1>"It's okay to not be okay. You're not alone in this journey."</h1>
                        <p>Connect with others who understand and share your experiences.</p>
                    </div>
                    <div className="image-container"></div>
                </Header>
            </PageContainer>
            <CommunityOffers>
                <ImageContainer />
                <TextContainer>
                    <h2>What Our Community Offers</h2>
                    <p><strong>Real Connections, Real Support.</strong> If you’re done with the conventional support groups that feel distant and impersonal, imagine a space where you can connect with others who truly understand your struggles. Whether you’re looking to join different community groups, share your experiences, or engage with posts from others, our platform offers a space where support feels authentic and personal. Yes, mental health support can be engaging and interactive!</p>
                    <p><strong>Your Journey, Your Space.</strong> We believe that your mental health journey is uniquely yours. That’s why we provide a flexible platform where you can explore various community groups, post your own updates, and comment on others' experiences. Our goal is to make it easy for you to find the groups and conversations that resonate with your personal journey and provide the support you need.</p>
                    <p><strong>The Connection Promise.</strong> In our community, we strive to foster genuine connections and meaningful interactions. By joining, you become part of a supportive network dedicated to understanding and empathy. Whether you need someone to talk to or a place to share your thoughts, our platform ensures that your voice is heard and valued.</p>
                </TextContainer>
            </CommunityOffers>
            <JoinCommunities>
                <h2>Join Our Communities</h2>
                <CommunityListContainer>
                    <div className="community-item">
                        <div className="community-name">Anxiety</div>
                        <div className="community-details">
                            <div className="community-image" style={{ backgroundImage: 'url(/images/support.png)' }}></div>
                            <div className="community-description">
                                <p>Description of the community. This is where you can explain what the community is about and why it might be a good fit for the user.</p>
                            </div>
                        </div>
                        <Link to="/forum/anxiety" className="join-button">Join Now</Link>
                    </div>
                    <div className="community-item">
                        <div className="community-name">Depression</div>
                        <div className="community-details">
                            <div className="community-image" style={{ backgroundImage: 'url(/images/support.png)' }}></div>
                            <div className="community-description">
                                <p>Description of the community. This is where you can explain what the community is about and why it might be a good fit for the user.</p>
                            </div>
                        </div>
                        <Link to="/forum/depression" className="join-button">Join Now</Link>
                    </div>
                    <div className="community-item">
                        <div className="community-name">Mindfulness</div>
                        <div className="community-details">
                            <div className="community-image" style={{ backgroundImage: 'url(/images/support.png)' }}></div>
                            <div className="community-description">
                                <p>Description of the community. This is where you can explain what the community is about and why it might be a good fit for the user.</p>
                            </div>
                        </div>
                        <Link to="/forum/mindfulness" className="join-button">Join Now</Link>
                    </div>
                    <div className="community-item">
                        <div className="community-name">Sleep</div>
                        <div className="community-details">
                            <div className="community-image" style={{ backgroundImage: 'url(/images/support.png)' }}></div>
                            <div className="community-description">
                                <p>Description of the community. This is where you can explain what the community is about and why it might be a good fit for the user.</p>
                            </div>
                        </div>
                        <Link to="/forum/sleep" className="join-button">Join Now</Link>
                    </div>
                </CommunityListContainer>
            </JoinCommunities>
        </>
    );
};

export default CommunityList;