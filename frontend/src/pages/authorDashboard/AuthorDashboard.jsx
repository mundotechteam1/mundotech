import { useEffect, useState } from "react";
import styles from "./AuthorDashboard.module.scss";
import AuthorProfile from "../../components/authorProfile/AuthorProfile";
import ArticleFilters from "../../components/articleFilters/ArticleFilters";
import ArticleCard from "../../components/articleCardManager/ArticleCardManager";
import Pagination from "../../components/pagination/Pagination";
import ArticleEditor from "../../components/articleEditor/ArticleEditor";

function AuthorDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/articles");

      if (!response.ok) {
        throw new Error("No se pudieron cargar los artículos");
      }

      const data = await response.json();
      setArticles(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles =
    filter === "ALL"
      ? articles
      : articles.filter((article) => article.status === filter);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedArticles = filteredArticles.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleGoToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const totalPublished = articles.filter(
    (article) => article.status === "PUBLISHED",
  ).length;

  const reviewCycles = articles.filter(
    (article) => article.status === "IN_REVIEW",
  ).length;

  const firstArticle = articles[0];
  const author = firstArticle?.author || { name: "M. Atrus" };

  const handleDelete = async (articleId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este artículo?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/${articleId}?authorId=1`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar el artículo");
      }

      setArticles((prev) => prev.filter((a) => a.id !== articleId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = () => {
    setIsEditorOpen(true);
  };

  return (
    <main className={styles.authorDashboard}>
      <section className={styles.authorDashboardTitle}>
        <div>
          <p className={styles.authorDashboardSubtitle}>
            Terminal Editorial Interno
          </p>
          <h1>Panel del Autor</h1>
        </div>

        <button
          className={styles.authorDashboardCreateButton}
          type="button"
          onClick={() => setIsEditorOpen(true)}
        >
          Crear nuevo artículo
        </button>
      </section>

      <AuthorProfile
        author={author}
        totalPublished={totalPublished}
        reviewCycles={reviewCycles}
      />

      <ArticleFilters filter={filter} onFilterChange={handleFilterChange} />

      {loading && (
        <p className={styles.authorDashboardMessage}>Cargando artículos...</p>
      )}

      {error && <p className={styles.authorDashboardError}>{error}</p>}

      <section className={styles.authorArticles}>
        {paginatedArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            variant="author"
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </section>

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        totalItems={filteredArticles.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handleGoToPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      <ArticleEditor
        isEditorOpen={isEditorOpen}
        setIsEditorOpen={setIsEditorOpen}
      />
    </main>
  );
}

export default AuthorDashboard;
