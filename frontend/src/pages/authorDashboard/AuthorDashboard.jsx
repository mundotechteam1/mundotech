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

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  const getUserInfo = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return { id: payload.id, name: payload.name, email: payload.sub };
    } catch {
      return null;
    }
  };

  const userInfo = getUserInfo();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/author/${userInfo.id}`,
        { headers: authHeaders() },
      );

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

  const loggedInUser = { name: userInfo?.name || "Autor" };

  const handleSendReview = async (articleId) => {
    const authorId = userInfo?.id;
    if (!authorId) {
      setError("No se pudo identificar al usuario");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/${articleId}/send-review?authorId=${authorId}`,
        { method: "PUT", headers: authHeaders() },
      );
      if (!response.ok) throw new Error("No se pudo enviar a revisión");
      loadArticles();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (articleId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este artículo?"))
      return;

    const authorId = userInfo?.id;
    if (!authorId) {
      setError("No se pudo identificar al usuario");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/${articleId}?authorId=${authorId}`,
        { method: "DELETE", headers: authHeaders() },
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar el artículo");
      }

      setArticles((prev) => prev.filter((a) => a.id !== articleId));
    } catch (err) {
      setError(err.message);
    }
  };

  const [editingArticle, setEditingArticle] = useState(null);

  const handleEdit = (articleId) => {
    const article = articles.find((a) => a.id === articleId);
    if (article) {
      setEditingArticle(article);
      setIsEditorOpen(true);
    }
  };

  const handleCreateNew = () => {
    setEditingArticle(null);
    setIsEditorOpen(true);
  };

  const handleArticleUpdated = () => {
    loadArticles();
  };

  const handleEditorClose = (val) => {
    setIsEditorOpen(val);
    if (!val) setEditingArticle(null);
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
          onClick={handleCreateNew}
        >
          Crear artículo
        </button>
      </section>

      <AuthorProfile
        author={loggedInUser}
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
            onSendReview={handleSendReview}
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
        setIsEditorOpen={handleEditorClose}
        article={editingArticle}
        onArticleUpdated={handleArticleUpdated}
      />
    </main>
  );
}

export default AuthorDashboard;
