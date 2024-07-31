// src/components/blogs/CreateBlog.js
import React, { useState } from 'react';
import styled from 'styled-components';

const CreateBlogContainer = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f1f1f1;
    color: #333;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    margin-bottom: 5px;
    display: block;
    font-weight: bold;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    background-color: #fff;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Textarea = styled.textarea`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    background-color: #fff;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Button = styled.button`
    padding: 12px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/createBlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, author }),
        });

        if (response.ok) {
            alert('Blog added successfully');
            setTitle('');
            setContent('');
            setAuthor('');
        } else {
            alert('Failed to add blog');
        }
    };

    return (
        <CreateBlogContainer>
            <h1>Create New Blog</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Title:</Label>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Content:</Label>
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Author:</Label>
                    <Input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </FormGroup>
                <Button type="submit">Create Blog</Button>
            </Form>
        </CreateBlogContainer>
    );
};

export default CreateBlog;

