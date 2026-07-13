import styles from "./ArticleCard.module.scss";

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
function ArticleCard({ article, isLast = false }) {
  const { image, imageAlt, category, date, author, title, excerpt } = article;

  const cardClassName = `${styles.articleCard}${
    isLast ? ` ${styles.articleCardLast}` : ""
  }`;

  return (
    <article className={cardClassName}>
      {category && <p className={styles.articleCardEyebrow}>{category}</p>}

      <div className={styles.articleCardMedia}>
        <img
          className={styles.articleCardImage}
          src={image}
          alt={imageAlt || title}
          loading="lazy"
        />
        <div className={styles.articleCardMeta}>
          <span className={styles.articleCardDate}>{date}</span>
          <span className={styles.articleCardAuthor}>Por {author}</span>
        </div>
      </div>

      <h2 className={styles.articleCardTitle}>{title}</h2>
      <p className={styles.articleCardExcerpt}>{excerpt}</p>
    </article>
  );
}

export default ArticleCard;