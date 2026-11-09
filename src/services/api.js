const NY_TIMES_API_KEY = import.meta.env.VITE_NY_TIMES_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc';

const checkApiKey = () => {
  if (!NY_TIMES_API_KEY) {
    throw new Error('Missing NY Times API key. Add VITE_NY_TIMES_API_KEY to your .env file.');
  }
};

export const fetchTopStories = async () => {
  try {
    checkApiKey();
    const response = await fetch(
      `${BASE_URL}/topstories/v2/home.json?api-key=${NY_TIMES_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch top stories');
    }

    const data = await response.json();
    return data.results.slice(0, 12).map((article) => ({
      title: article.title,
      abstract: article.abstract,
      url: article.url,
      section: article.section,
      published_date: article.published_date
    }));
  } catch (error) {
    console.error('Error fetching top stories:', error);
    throw error;
  }
};

export const searchArticles = async (query) => {
  try {
    checkApiKey();
    const response = await fetch(
      `${BASE_URL}/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&api-key=${NY_TIMES_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to search articles');
    }

    const data = await response.json();
    return data.response.docs.slice(0, 12).map((article) => ({
      title: article.headline.main,
      abstract: article.abstract,
      url: article.web_url,
      section: article.section_name,
      published_date: article.pub_date
    }));
  } catch (error) {
    console.error('Error searching articles:', error);
    throw error;
  }
};