import styles from "./ArticleCard.module.scss";

function ArticleCard({ article, isLast = false }) {
  const {
    title,
    content,
    author,
    publishedAt,
    createdAt,
    status,
  } = article;

  const formattedDate = publishedAt || createdAt;

  return (
    <article className={isLast ? styles.articleCardLast : styles.articleCard}>

      <div className={styles.articleCardMeta}>
        <span className={styles.articleCardDate}>
          {formattedDate
            ? new Date(formattedDate).toLocaleDateString("es-ES")
            : ""}
        </span>

        <span className={styles.articleCardAuthor}>
          Por {author?.name}
        </span>
      </div>

      <h2 className={styles.articleCardTitle}>
        {title}
      </h2>

      <p className={styles.articleCardExcerpt}>
        {content}
      </p>

      <span className={styles.articleCardStatus}>
        {status}
      </span>

    </article>
  );
}

export default ArticleCard;