import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Posts from './components/Posts';
import Pagination from './components/Pagination';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10)


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPosts = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPosts - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPosts);


  // Pagination
  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-success mb-4">My Blog Posts</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination totalPosts={posts.length} postsPerPage={postsPerPage} handlePagination={handlePagination} />
    </div>
  );
}

export default App;
