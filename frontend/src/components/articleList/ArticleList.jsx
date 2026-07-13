
import ArticleCard from "../articlecard/ArticleCard";
import styles from "./ArticleList.module.scss";

function ArticleList({
  articles,
  isLoading = false,
  error = null,
  onLoadMore = () => {},
  hasMore = false,
}) {
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
          isLast={!hasMore && index === articles.length - 1}
        />
      ))}

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
            {isLoading ? "Cargando…" : "Ver más artículos"}
          </button>
        </div>
      )}
    </section>
  );
}

export default ArticleList;