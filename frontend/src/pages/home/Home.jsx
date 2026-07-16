import { useEffect, useState } from "react";
import ArticleList from "../../components/articleList/ArticleList";
import Pagination from "../../components/pagination/Pagination";
import { getPublishedArticles } from "../../services/articleService";
import styles from "./Home.module.scss";

function Home() {
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getPublishedArticles();

        const sorted = [...data].sort(
          (a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt)
        );
        setAllArticles(sorted);
      } catch (err) {
        console.error("Error cargando artículos:", err);
        setError("No se pudieron cargar los artículos.");
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  const totalPages = Math.ceil(allArticles.length / itemsPerPage);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedArticles = allArticles.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );

  const handleGoToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <main className={styles.homeContainer}>
      <ArticleList
        articles={paginatedArticles}
        isLoading={isLoading}
        error={error}
        hasMore={false}
        onLoadMore={() => {}}
      />
      {!isLoading && !error && (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={allArticles.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handleGoToPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </main>
  );
}

export default Home;