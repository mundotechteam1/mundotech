import "./ArticleCard.module.scss";

/**
 * Tarjeta de artículo individual.
 * Espera un objeto `article` ya normalizado desde tu API/CMS con esta forma:
 * {
 *   id: string | number,
 *   image: string,
 *   imageAlt: string,
 *   category: string,      // opcional, ej. "Mundo Tech" (eyebrow sobre la imagen)
 *   date: string,           // ya formateada, ej. "8 julio, 2039"
 *   author: string,         // ej. "Elara Vance"
 *   title: string,
 *   excerpt: string,
 * }
 */
function ArticleCard({ article, isLast }) {
  const { image, imageAlt, category, date, author, title, excerpt } = article;

  return (
    <article className={`article-card${isLast ? " article-card--last" : ""}`}>
      {category && <p className="article-card__eyebrow">{category}</p>}

      <div className={styles['article-card__media']}>
        <img
          className={styles['article-card__image']}
          src={image}
          alt={imageAlt || title}
          loading="lazy"
        />
        <div className={styles['article-card__meta']}>
          <span className={styles['article-card__date']}>{date}</span>
          <span className={styles['article-card__author']}>Por {author}</span>
        </div>
      </div>

      <h2 className={styles['article-card__title']}>{title}</h2>
      <p className={styles['article-card__excerpt']}>{excerpt}</p>
    </article>
  );
}

/*ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
  }).isRequired,
  isLast: PropTypes.bool,
};

ArticleCard.defaultProps = {
  isLast: false,
};
*/
export default ArticleCard;
