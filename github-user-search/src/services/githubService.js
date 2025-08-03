import axios from 'axios';

/**
 * Fetch users from GitHub Search API with query parameters.
 * @param {Object} params - Search parameters.
 * @param {string} params.username - GitHub username filter.
 * @param {string} params.location - User location filter.
 * @param {string|number} params.minRepos - Minimum repo count filter.
 * @returns {Promise<Array>} Array of detailed user objects.
 */
export const fetchAdvancedUserSearch = async ({ username, location, minRepos }) => {
  const queryParts = [];

  if (username) queryParts.push(`${username} in:login`);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>=${minRepos}`);

  const query = queryParts.join(' ');

  const response = await axios.get('https://api.github.com/search/users', {
    params: {
      q: query,
      per_page: 10,
    },
  });

  // Fetch full user details for each user in search results
  const detailedUsers = await Promise.all(
    response.data.items.map(async (user) => {
      const userDetails = await axios.get(user.url);
      return userDetails.data;
    })
  );

  return detailedUsers;
};
