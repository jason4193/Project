import React, { useState, useEffect } from 'react';

function Home() {
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const search = document.getElementById('search').value;
    const response = await fetch(`http://localhost:3001/blogs?search=${search}`);
    const data = await response.json();
    setData(data);
  }

  const renderData = (data) => {
    return data.map((blog, id) => {
      return (
        <div key={id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      )
    })
  }

  return (
    <div className="App">
        <h1>SQLI2 - Data Extraction with Union Injection</h1>
        <b>Try to extract more data by using Union Injection.</b>
        <br />
        <form onSubmit={handleSubmit}>
          <input type="text" id="search" name="search" placeholder="Search for blogs from user"/>
          <button type="submit">Search</button>
        </form>
        <br />
        {data.length > 0 && renderData(data)}
    </div>
  );
}
export default Home;