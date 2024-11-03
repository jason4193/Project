import React, { useState } from 'react';
import Cookie from 'js-cookie';
import Navi from './Navi';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddBlog = (e) => {
    e.preventDefault();
    // Handle add blog logic here
    fetch('http://localhost:3001/blogs', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cookie.get('session'),
        },
        }).then(response => {
        if (response.ok) {
            console.log('Blog added successfully');
            window.location.href = '/';
        } else {
            alert('Failed to add blog');
        }
        }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
  };

  return (
    <div className="App">
      <Navi />
      <div className="form-card">
        <h1>Add Blog</h1>
        <form onSubmit={handleAddBlog}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="submit">Add Blog</button>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;