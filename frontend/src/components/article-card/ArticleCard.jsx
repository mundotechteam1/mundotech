import styles from './ArticleCard.module.scss'

const statusLabels = {
  DRAFT: 'Borrador',
  IN_REVIEW: 'En Revisión',
  PUBLISHED: 'Publicado',
}

const statusClassMap = {
  DRAFT: 'statusDraft',
  IN_REVIEW: 'statusInReview',
  PUBLISHED: 'statusPublished',
}

const months = [
  'Ene','Feb','Mar','Abr','May','Jun',
  'Jul','Ago','Sep','Oct','Nov','Dic',
]

function formatDate(dateStr) {
  if (!dateStr) return '27 oct 2026'
  const d = new Date(dateStr)
  if (isNaN(d)) return dateStr
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`
}

function ArticleCard({
  article,
  variant = 'author',
  onApprove,
  onReject,
  onDelete,
  onEdit,
}) {
  if (variant === 'manager') {
    return (
      <article className={styles.managerArticle}>
        <p className={styles.managerCategory}>
          {article.author?.name || 'Editorial'}
        </p>

        <h2>{article.title}</h2>

        <div className={styles.managerMeta}>
          <span>Por {article.author?.name || 'Autor'}</span>
          <span>{formatDate(article.createdAt || article.created_at)}</span>
        </div>

        <div className={styles.managerActions}>
          <button type="button" onClick={() => onApprove?.(article.id)}>
            Aprobar
          </button>
          <button type="button" onClick={() => onReject?.(article.id)}>
            Rechazar
          </button>
        </div>

        <div className={styles.managerIconActions}>
          <button
            className={`${styles.iconAction} ${styles.delete}`}
            type="button"
            onClick={() => onDelete?.(article.id)}
          >
            ×
          </button>
          <button
            className={styles.iconAction}
            type="button"
            onClick={() => onEdit?.(article.id)}
          >
            ✎
          </button>
        </div>
      </article>
    )
  }

  return (
    <article className={styles.articleCard}>
      <div className={styles.articleCardMeta}>
        <span
          className={`${styles.articleCardStatus} ${styles[statusClassMap[article.status]] || ''}`}
        >
          {statusLabels[article.status] || article.status}
        </span>
        <span>{formatDate(article.createdAt || article.created_at)}</span>
      </div>

      <h2>{article.title}</h2>

      <p className={styles.articleCardContent}>{article.content}</p>

      <div className={styles.articleCardActions}>
        {article.status === 'DRAFT' && (
          <button className={styles.primaryAction} type="button">
            Enviar a revisión
          </button>
        )}

        {article.status === 'IN_REVIEW' && (
          <button className={styles.secondaryAction} type="button">
            Pendiente de aprobación
          </button>
        )}

        {article.status === 'PUBLISHED' && (
          <button className={styles.secondaryAction} type="button">
            Ver publicado
          </button>
        )}

        <button
          className={`${styles.iconAction} ${styles.delete}`}
          type="button"
          onClick={() => onDelete?.(article.id)}
        >
          ×
        </button>

        <button
          className={`${styles.iconAction} ${styles.edit}`}
          type="button"
          onClick={() => onEdit?.(article.id)}
        >
          ✎
        </button>
      </div>
    </article>
  )
}

export default ArticleCard
