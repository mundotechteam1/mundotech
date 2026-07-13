import styles from "./ArticleCard.module.scss";

/**
 

    Tarjeta de artículo individual.
    Espera un objeto article normalizado:
    {
    id: string | number,
    image: string,
    imageAlt: string,
    category: string,
    date: string,
    author: string,
    title: string,
    excerpt: string,
    }*/


function ArticleCard({ article, isLast = false }) {
  const {
    image,
    imageAlt,
    category,
    date,
    author,
    title,
    excerpt,
  } = article;

  return (
    <article className={isLast ? styles.articleCardLast : styles.articleCard}>
      {category && (
        <p className={styles.articleCardEyebrow}>
          {category}
        </p>
      )}

      <div className={styles.articleCardMedia}>
        <img
          className={styles.articleCardImage}
          src={image}
          alt={imageAlt || title}
          loading="lazy"
        />

        <div className={styles.articleCardMeta}>
          <span className={styles.articleCardDate}>
            {date}
          </span>

          <span className={styles.articleCardAuthor}>
            Por {author}
          </span>
        </div>
      </div>

      <h2 className={styles.articleCardTitle}>
        {title}
      </h2>

      <p className={styles.articleCardExcerpt}>
        {excerpt}
      </p>
    </article>
  );
}

export default ArticleCard;