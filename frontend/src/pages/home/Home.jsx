import { useEffect, useState } from "react";
import ArticleList from "../../components/articleList/ArticleList";
import { getPublishedArticles } from "../../services/articleService";

function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getPublishedArticles();

        setArticles(data.slice(0, 5));

      } catch (err) {
        console.error("Error cargando artículos:", err);
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

export default Home;