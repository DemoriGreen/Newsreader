import { useArticles } from '../context/ArticlesContext';

function ArticleCard({ article }) {
  const { saveArticle, removeArticle, isSaved } = useArticles();
  const saved = isSaved(article.url);

  const handleBookmarkClick = () => {
    if (saved) {
      removeArticle(article.url);
    } else {
      saveArticle(article);
    }
  };

  return (
    <div className="article-card">
      <div className="article-header">
        <h3 className="article-title">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>
        <button
          onClick={handleBookmarkClick}
          className={`bookmark-btn ${saved ? 'saved' : ''}`}
          aria-label={saved ? 'Remove bookmark' : 'Add bookmark'}
          disabled={!localStorage.getItem('newsreader-user')}
          title={!localStorage.getItem('newsreader-user') ? 'Log in to save articles' : ''}
        >
          {saved ? '🔖' : '📑'}
        </button>
      </div>
      <p className="article-abstract">{article.abstract}</p>
      <div className="article-meta">
        <span>{article.section}</span>
        <span>{new Date(article.published_date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default ArticleCard;