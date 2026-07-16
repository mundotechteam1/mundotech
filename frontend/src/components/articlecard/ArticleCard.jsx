import styles from "./ArticleCard.module.scss";

import iaImg from "../../assets/article/pexels-karola-g-5717689.jpg";
import robotImg from "../../assets/article/office_bw_illustration.png";
import techImg from "../../assets/article/pexels-moe-magners-7495227.jpg";
import negImg from "../../assets/article/pexels-negativespace-34123.jpg";
import silverImg from "../../assets/article/pexels-silverkblack-36729917.jpg";

function ArticleCard({ article, index, isLast = false }) {

  const {
    title,
    content,
    author,
    publishedAt,
    createdAt,
    status,
  } = article;

  const formattedDate = publishedAt || createdAt;

  const images = {
    1: iaImg,
    2: robotImg,
    3: techImg,
    4: negImg,
    5: silverImg,
  };

  return (
    <article className={isLast ? styles.articleCardLast : styles.articleCard}>

      <div className={styles.articleCardMedia}>

        <img
          className={styles.articleCardImage}
          src={images[index + 1] || techImg}
          alt={title}
          loading="lazy"
        />

        <div className={styles.articleCardMeta}>
          <span className={styles.articleCardDate}>
            {formattedDate
              ? new Date(formattedDate).toLocaleDateString("es-ES")
              : ""}
          </span>

          <span className={styles.articleCardAuthor}>
            Por {author?.name || author || "Autor desconocido"}
          </span>
        </div>

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