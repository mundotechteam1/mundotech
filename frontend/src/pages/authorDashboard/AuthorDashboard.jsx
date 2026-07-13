import { useEffect, useState } from "react";
import styles from "./AuthorDashboard.module.scss";
import ArticleEditor from "../../components/articleEditor/ArticleEditor";

function AuthorDashboard() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("ALL");
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

  const statusLabels = {
    DRAFT: "Borrador",
    IN_REVIEW: "En Revisión",
    PUBLISHED: "Publicado",
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "27 oct 2026";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    const meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    return `${d.getDate()} ${meses[d.getMonth()]}, ${d.getFullYear()}`;
  };

  const statusClassMap = {
    DRAFT: "statusDraft",
    IN_REVIEW: "statusInReview",
    PUBLISHED: "statusPublished",
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

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const itemsPerPageOptions = [10, 20, 50];

  return (
    <div className={styles.authorDashboard}>
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

      <section className={styles.authorProfile}>
        <p className={styles.authorProfileLabel}>Perfil del Autor</p>

        <div className={styles.authorProfileContent}>
          <div className={styles.authorProfileAvatar}>M</div>

          <div>
            <h2>M. Atrus</h2>
          </div>
        </div>

        <div className={styles.authorProfileStats}>
          <span>Total Publicados</span>

          <strong>
            {
              articles.filter((article) => article.status === "PUBLISHED")
                .length
            }
          </strong>
        </div>

        <div className={styles.authorProfileStats}>
          <span>Ciclos de Revisión</span>

          <strong>
            {
              articles.filter((article) => article.status === "IN_REVIEW")
                .length
            }
          </strong>
        </div>
      </section>

      <section className={styles.authorFilters}>
        <span>Filtrar por:</span>

        <button
          type="button"
          className={filter === "ALL" ? styles.active : ""}
          onClick={() => setFilter("ALL")}
        >
          Todos
        </button>

        <button
          type="button"
          className={filter === "DRAFT" ? styles.active : ""}
          onClick={() => setFilter("DRAFT")}
        >
          Borrador
        </button>

        <button
          type="button"
          className={filter === "IN_REVIEW" ? styles.active : ""}
          onClick={() => setFilter("IN_REVIEW")}
        >
          En Revisión
        </button>

        <button
          type="button"
          className={filter === "PUBLISHED" ? styles.active : ""}
          onClick={() => setFilter("PUBLISHED")}
        >
          Publicados
        </button>
      </section>

      {loading && (
        <p className={styles.authorDashboardMessage}>Cargando artículos...</p>
      )}

      {error && <p className={styles.authorDashboardError}>{error}</p>}

      <section className={styles.authorArticles}>
        {paginatedArticles.map((article) => (
          <article className={styles.authorCard} key={article.id}>
            <div className={styles.authorCardMeta}>
              <span
                className={`${styles.authorCardStatus} ${styles[statusClassMap[article.status]]}`}
              >
                {statusLabels[article.status] || article.status}
              </span>

              <span>{formatDate(article.createdAt || article.created_at)}</span>
            </div>

            <h2>{article.title}</h2>

            <p className={styles.authorCardContent}>{article.content}</p>

            <div className={styles.authorCardActions}>
              {article.status === "DRAFT" && (
                <button className={styles.primaryAction} type="button">
                  Enviar a revisión
                </button>
              )}

              {article.status === "IN_REVIEW" && (
                <button className={styles.secondaryAction} type="button">
                  Pendiente de aprobación
                </button>
              )}

              {article.status === "PUBLISHED" && (
                <button className={styles.secondaryAction} type="button">
                  Ver publicado
                </button>
              )}

              <button
                className={`${styles.iconAction} ${styles.delete}`}
                type="button"
              >
                ×
              </button>

              <button
                className={`${styles.iconAction} ${styles.edit}`}
                type="button"
              >
                ✎
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.authorPagination}>
        <button type="button">Anterior</button>
        <button className={styles.active} type="button">
          1
        </button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">Siguiente</button>
      </section>

      {isEditorOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsEditorOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              type="button"
              onClick={() => setIsEditorOpen(false)}
              aria-label="Cerrar editor"
            >
              ×
            </button>

            <ArticleEditor onClose={() => setIsEditorOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthorDashboard;
