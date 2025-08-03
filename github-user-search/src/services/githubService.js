import axios from 'axios';

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

  const userDetails = await Promise.all(
    response.data.items.map(async (user) => {
      const detailRes = await axios.get(user.url);
      return detailRes.data;
    })
  );

  return userDetails;
};
