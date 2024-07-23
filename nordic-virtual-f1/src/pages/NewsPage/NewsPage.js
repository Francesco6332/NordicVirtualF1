import React, { useEffect, useState } from 'react';

function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch news from the backend
    const fetchNews = async () => {
      const response = await fetch('http://18.194.185.210:8000/api/news');
      const data = await response.json();
      setNews(data);
    };

    fetchNews();
  }, []);

  return (
    <div className="news">
      <h1>News</h1>
      <ul>
        <li>News</li>
      </ul>
    </div>
  );
}

export default NewsPage;
