import React, { useState, useEffect } from 'react';
import Navi from './Navi';
import Cookie from 'js-cookie';

function Home() {
  const [data, setData] = useState([]);

  const handleDeleteBlog = (id) => {
    return () => {
      console.log("Deleting blog with id:", id);
      fetch(`http://localhost:3001/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': Cookie.get('session'),
        },
      })
        .then(response => { 
          if (!response.ok) {
            alert('Failed to delete blog');
          } else {
            alert('Blog deleted successfully');
            window.location.reload();
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        }
      );
    };
  };


  const renderData = (data) => {
    console.log("Rendering");
    return data.map((blog, id) => {
      return (
        <div id={blog.id} className="blog-card">
          <h2 dangerouslySetInnerHTML={{ __html: blog.title }}></h2>
          <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
          <p dangerouslySetInnerHTML={{ __html: `Author: ${blog.author}` }}></p>
          <button onClick={handleDeleteBlog(blog.id)}>remove</button>
        </div>
      );
    });
  };

  useEffect(() => {
    fetch('http://localhost:3001/blogs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Log the data
        setData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);


  return (
    <div className="App">
        <Navi />
        <h1>XSS2 - Stored XSS Challenge</h1>
        <b>Try to steal the secret cookie from the admin user!</b>
          
        <div className="blogs-div">
          {data.length > 0 ? renderData(data) : <p>Loading...</p>}
        </div>
    </div>
  );
}
export default Home;