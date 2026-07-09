import PropTypes from 'prop-types';
import ArticleCard from '../articlecard/ArticleCard';
import './ArticleList.module.scss';

/**
 * Lista de artículos de la Home.
 * Este componente es "tonto": no hace fetch, solo pinta lo que le pasan.
 * El fetch (tu servicio/hook de API) vive en el componente padre (ej. HomePage)
 * y se le pasan los resultados por props.
 */
function ArticleList({ articles, isLoading, error, onLoadMore, hasMore }) {
  if (error) {
    return (
      <section className="article-list article-list--state">
        <p className="article-list__error">
          No se han podido cargar los artículos. Inténtalo de nuevo más tarde.
        </p>
      </section>
    );
  }

  if (isLoading && articles.length === 0) {
    return (
      <section className="article-list article-list--state">
        <p className="article-list__loading">Cargando artículos…</p>
      </section>
    );
  }

  if (!isLoading && articles.length === 0) {
    return (
      <section className="article-list article-list--state">
        <p className="article-list__empty">Todavía no hay artículos publicados.</p>
      </section>
    );
  }

  return (
    <section className="article-list">
      {articles.map((article, index) => (
        <ArticleCard
          key={article.id}
          article={article}
          isLast={!hasMore && index === articles.length - 1}
        />
      ))}

      {hasMore && (
        <div className="article-list__footer">
          <button
            type="button"
            className="article-list__load-more"
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Cargando…' : 'Ver más artículos'}
          </button>
        </div>
      )}
    </section>
  );
}

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onLoadMore: PropTypes.func,
  hasMore: PropTypes.bool,
};

ArticleList.defaultProps = {
  isLoading: false,
  error: null,
  onLoadMore: () => {},
  hasMore: false,
};

export default ArticleList;
