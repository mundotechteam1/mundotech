import { useEffect, useState } from "react";
import ArticleList from "../../components/ArticleList/ArticleList";
import { getArticles } from "../../services/articleService";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getArticles();

        const publishedArticles = data
          .filter((article) => article.status === "PUBLISHED")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setArticles(publishedArticles);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los artículos.");
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <ArticleList
      articles={articles}
      isLoading={isLoading}
      error={error}
      hasMore={false}
      onLoadMore={() => {}}
    />
  );
}

export default Articles;