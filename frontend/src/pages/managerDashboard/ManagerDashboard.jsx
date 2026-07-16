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
<<<<<<< HEAD
  const [editingArticle, setEditingArticle] = useState(null);

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split(".")[1])).id;
    } catch {
      return null;
    }
  };
=======
>>>>>>> main

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch("http://localhost:8080/api/v1/articles", {
        headers: authHeaders(),
      });
=======
      const response = await fetch("http://localhost:8080/api/v1/articles");
>>>>>>> main

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

<<<<<<< HEAD
  const handleApprove = async (articleId) => {
    const managerId = getUserId();
    if (!managerId) {
      setError("No se pudo identificar al usuario");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/${articleId}/approve?managerId=${managerId}`,
        { method: "PUT", headers: authHeaders() },
      );

      if (!response.ok) {
        throw new Error("No se pudo aprobar el artículo");
      }

      setArticles((prev) =>
        prev.map((a) => (a.id === articleId ? { ...a, status: "PUBLISHED" } : a)),
=======
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
>>>>>>> main
      );
    } catch (err) {
      setError(err.message);
    }
  };

<<<<<<< HEAD
=======
  const handleApprove = (articleId) =>
    updateArticleStatus(articleId, "PUBLISHED");
  const handleReject = (articleId) => updateArticleStatus(articleId, "DRAFT");

>>>>>>> main
  const handleDelete = async (articleId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este artículo?"))
      return;

<<<<<<< HEAD
    const managerId = getUserId();
    if (!managerId) {
      setError("No se pudo identificar al usuario");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/${articleId}/manager?managerId=${managerId}`,
        { method: "DELETE", headers: authHeaders() },
=======
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/${articleId}?authorId=1`,
        {
          method: "DELETE",
        },
>>>>>>> main
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar el artículo");
      }

      setArticles((prev) => prev.filter((a) => a.id !== articleId));
    } catch (err) {
      setError(err.message);
    }
  };

<<<<<<< HEAD
  const handleEdit = (articleId) => {
    const article = articles.find((a) => a.id === articleId);
    if (article) {
      setEditingArticle(article);
      setIsEditorOpen(true);
    }
  };

  const handleArticleUpdated = () => {
    loadArticles();
  };

  const handleEditorClose = (val) => {
    setIsEditorOpen(val);
    if (!val) setEditingArticle(null);
=======
  const handleEdit = () => {
    setIsEditorOpen(true);
>>>>>>> main
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
<<<<<<< HEAD
=======
            onReject={handleReject}
>>>>>>> main
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
<<<<<<< HEAD
        setIsEditorOpen={handleEditorClose}
        article={editingArticle}
        onArticleUpdated={handleArticleUpdated}
=======
        setIsEditorOpen={setIsEditorOpen}
>>>>>>> main
      />
    </div>
  );
}

export default ManagerDashboard;
