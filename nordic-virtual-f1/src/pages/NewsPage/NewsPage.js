import React, { useEffect, useState } from 'react';

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch news from the backend
    const fetchNews = async () => {
      const response = await fetch('http://18.156.77.207:8000/api/news');
      const data = await response.json();
      setNews(data);
    };

    fetchNews();
  }, []);

  return (
    <div className="news">
      <h1>News</h1>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;
