import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Sigurdthe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '8px', width: '300px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', marginLeft: '10px' }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Looks like we can't find the user.</p>}

      {user && (
        <div style={{ marginTop: '20px' }}>
          <img src={user.avatar_url} alt={`${user.login}'s avatar`} width="120" />
          <h2>{user.name || user.login}</h2>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
