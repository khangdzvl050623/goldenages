import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('https://goldenages-3.onrender.com/scrape/history');
      console.log('Articles data:', response.data); // Debug log
      setArticles(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch articles');
      setLoading(false);
      console.error('Error fetching articles:', err);
    }
  };

  // xử lý lỗi hình ảnh
  const handleImageError = (e) => {
    e.target.src = '/placeholder.jpg'; // Hình mặc định khi lỗi
  };

  const isBase64Image = (url) => {
    return url?.startsWith('data:image');
  };

  const isValidHttpUrl = (url) => {
    return url?.startsWith('http');
  };

  const getImageUrl = (mediaUrl) => {
    if (isBase64Image(mediaUrl)) {
      return mediaUrl;
    } else if (isValidHttpUrl(mediaUrl)) {
      return mediaUrl;
    }
    return '/placeholder.jpg';
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container" style={{ marginTop: '100px' }}>
      {/* Featured Article */}
      {articles.length > 0 && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card" >
              <div className="row g-0">

                <div className="col-md-8">
                  {articles[0].mediaType === 'video' ? (
                    <video
                      className="img-fluid w-100"
                      controls
                      style={{
                        maxHeight: '400px',
                        objectFit: 'cover',
                        minHeight: '300px'
                      }}
                    >
                      <source src={articles[0].mediaUrl} type="video/mp4" />
                      Your browser does not support video playback.
                    </video>
                  ) : (
                    <img
                      src={articles[0].mediaUrl}
                      className="img-fluid w-100"
                      alt={articles[0].title}
                      onError={handleImageError}
                      style={{
                        maxHeight: '400px',
                        objectFit: 'cover',
                        minHeight: '300px'
                      }}
                    />
                  )}
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <h3 className="card-title">{articles[0].title}</h3>
                    <p className="card-text">{articles[0].description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        {new Date(articles[0].dateTime).toLocaleString()}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List of Articles */}
      <div className="row">
        {articles.slice(1).map((article, index) => (
          <div key={article.id || index} className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
            {/* tạo đường dẫn bài báo */}
            <div
              onClick={() => window.open(article.link, "_blank")}
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <div className="card h-100" style={{ border: 'none' }}>
                {article.mediaType === 'video' ? (
                  <video
                    className="card-img-top"
                    controls
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      backgroundColor: '#f8f9fa'
                    }}
                  >
                    <source src={article.mediaUrl} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <img
                    src={getImageUrl(article.mediaUrl)}
                    className="card-img-top"
                    alt={article.title || 'News image'}
                    onError={handleImageError}
                    loading="lazy"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      backgroundColor: '#f8f9fa'
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text text-truncate">{article.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      {new Date(article.dateTime).toLocaleString()}
                    </small>
                  </p>
                </div>
              </div>
              <hr />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
