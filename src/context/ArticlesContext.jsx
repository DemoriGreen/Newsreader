import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const { user } = useAuth();
  const [articlesByUser, setArticlesByUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('newsreader-saved-articles')) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('newsreader-saved-articles', JSON.stringify(articlesByUser));
  }, [articlesByUser]);

  const username = user?.username;

  const saveArticle = (article) => {
    if (!username) return;
    setArticlesByUser((prev) => {
      const userArticles = prev[username] || [];
      if (userArticles.some((saved) => saved.url === article.url)) return prev;
      return { ...prev, [username]: [...userArticles, article] };
    });
  };

  const removeArticle = (url) => {
    if (!username) return;
    setArticlesByUser((prev) => ({
      ...prev,
      [username]: (prev[username] || []).filter((article) => article.url !== url)
    }));
  };

  const isSaved = (url) => {
    if (!username) return false;
    return (articlesByUser[username] || []).some((article) => article.url === url);
  };

  const getUserSavedArticles = () => {
    if (!username) return [];
    return articlesByUser[username] || [];
  };

  const getAllUserArticles = () => articlesByUser;

  return (
    <ArticlesContext.Provider
      value={{
        saveArticle,
        removeArticle,
        isSaved,
        getUserSavedArticles,
        getAllUserArticles
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};