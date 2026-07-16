import ArticleCard from "../articlecard/ArticleCard";
import { useNavigate } from "react-router-dom";
import styles from "./ArticleList.module.scss";

function ArticleList({
  articles,
  totalArticles = 0,
  isLoading = false,
  error = null,
  onLoadMore = () => {},
  hasMore = false,
}) {
  const navigate = useNavigate();

  const stateClassName = styles.articleList;

  if (error && articles.length === 0) {
    return (
      <section className={stateClassName}>
        <p className={styles.articleListError}>
          No se han podido cargar los artículos. Inténtalo de nuevo más tarde.
        </p>
      </section>
    );
  }

  if (isLoading && articles.length === 0) {
    return (
      <section className={stateClassName}>
        <p className={styles.articleListLoading}>
          Cargando artículos…
        </p>
      </section>
    );
  }

  if (!isLoading && articles.length === 0) {
    return (
      <section className={stateClassName}>
        <p className={styles.articleListEmpty}>
          Todavía no hay artículos publicados.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.articleList}>
      {articles.map((article, index) => (
        <ArticleCard
          key={article.id}
          article={article}
          index={index}
          isLast={!hasMore && index === articles.length - 1}
        />
      ))}

      {totalArticles > articles.length && (
        <div className={styles.articleListFooter}>
          <button
            type="button"
            className={styles.articleListLoadMore}
            onClick={() => navigate("/articles")}
          >
            Ver todos los artículos
          </button>
        </div>
      )}

      {hasMore && (
        <div className={styles.articleListFooter}>
          {error && (
            <p className={styles.articleListError}>
              No se han podido cargar más artículos. Inténtalo de nuevo más tarde.
            </p>
          )}

          <button
            type="button"
            className={styles.articleListLoadMore}
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? "Cargando…" : "Cargar más"}
          </button>
        </div>
      )}
    </section>
  );
}

export default ArticleList;