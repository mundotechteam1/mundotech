import { useEffect, useState } from "react";
import styles from "./ManagerDashboard.module.scss";
import ArticleCard from "../../components/ArticleCardManager/ArticleCardManager";
import Pagination from "../../components/pagination/Pagination";
import ArticleEditor from "../../components/articleEditor/ArticleEditor";

function ManagerDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  const updateArticleStatus = async (articleId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/${articleId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!response.ok) {
        throw new Error("No se pudo actualizar el artículo");
      }

      setArticles((prev) =>
        prev.map((a) => (a.id === articleId ? { ...a, status: newStatus } : a)),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleApprove = (articleId) =>
    updateArticleStatus(articleId, "PUBLISHED");
  const handleReject = (articleId) => updateArticleStatus(articleId, "DRAFT");

  const handleDelete = async (articleId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este artículo?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/${articleId}?authorId=1`,
        {
          method: "DELETE",
        },
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

  const articlesInReview = articles.filter(
    (article) => article.status === "IN_REVIEW",
  );

  const totalPages = Math.ceil(articlesInReview.length / itemsPerPage);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedArticles = articlesInReview.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );

  const handleGoToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.managerDashboard}>
      <section className={styles.managerDashboardTitle}>
        <div>
          <h1>
            Panel del
            <br />
            Administrador
          </h1>

          <p>Revisión Editorial</p>
        </div>

        <span className={styles.managerDashboardBadge}>
          Estado: En Revisión
        </span>
      </section>

      {loading && (
        <p className={styles.managerDashboardMessage}>Cargando artículos...</p>
      )}

      {error && <p className={styles.managerDashboardError}>{error}</p>}

      <section className={styles.managerDashboardArticles}>
        {paginatedArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            variant="manager"
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </section>

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        totalItems={articlesInReview.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handleGoToPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      <ArticleEditor
        isEditorOpen={isEditorOpen}
        setIsEditorOpen={setIsEditorOpen}
      />
    </div>
  );
}

export default ManagerDashboard;
