import axios from 'axios';

export const fetchAdvancedUserSearch = async ({ username, location, minRepos }) => {
  const queryParts = [];

  if (username) queryParts.push(`${username} in:login`);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>=${minRepos}`);

  const query = queryParts.join(' ');

  // IMPORTANT: Use a plain string URL including the required substring:
  const response = await axios.get("https://api.github.com/search/users?q", {
    params: {
      q: query,
      per_page: 10,
    },
  });

  // Fetch detailed user info for each user
  const detailedUsers = await Promise.all(
    response.data.items.map(async (user) => {
      const userDetails = await axios.get(user.url);
      return userDetails.data;
    })
  );

  return detailedUsers;
};
