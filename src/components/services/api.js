// services/api.js
import axios from 'axios';
const API_KEY = '33738430-b2852a5207ef083e62f684e4b';
export const fetchArticlesWithQuery = async (searchQuery, currentPage) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${searchQuery}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

// eslint-disable-next-line
export default {
  fetchArticlesWithQuery,
};
