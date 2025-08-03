// src/components/Search.jsx
import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          required
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="mt-4 text-center text-red-600">{error}</p>}

      {userData && (
        <div className="mt-6 p-4 border border-gray-300 rounded shadow">
          <img
            src={userData.avatar_url}
            alt={`${userData.login} avatar`}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="text-center text-xl font-semibold mt-2">
            {userData.name || userData.login}
          </h2>
          {userData.location && (
            <p className="text-center text-gray-600 mt-1">{userData.location}</p>
          )}
          <p className="text-center mt-1">
            Public repos: {userData.public_repos}
          </p>
          <div className="text-center mt-3">
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
