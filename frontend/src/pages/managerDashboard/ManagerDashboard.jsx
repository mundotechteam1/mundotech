import { useEffect, useState } from 'react'
import styles from './ManagerDashboard.module.scss'

function ManagerDashboard() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/articles')

      if (!response.ok) {
        throw new Error('No se pudieron cargar los artículos')
      }

      const data = await response.json()
      setArticles(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateArticleStatus = async (articleId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/articles/${articleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('No se pudo actualizar el artículo')
      }

      setArticles((prev) =>
        prev.map((a) =>
          a.id === articleId ? { ...a, status: newStatus } : a
        )
      )
    } catch (err) {
      setError(err.message)
    }
  }

  const handleApprove = (articleId) => updateArticleStatus(articleId, 'PUBLISHED')
  const handleReject = (articleId) => updateArticleStatus(articleId, 'DRAFT')

  const articlesInReview = articles.filter(
    (article) => article.status === 'IN_REVIEW'
  )

  const formatDate = (dateStr) => {
    if (!dateStr) return '27 oct 2026'
    const d = new Date(dateStr)
    if (isNaN(d)) return dateStr
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
    return `${d.getDate()} ${meses[d.getMonth()]}, ${d.getFullYear()}`
  }

  return (
    <div className={styles.managerDashboard}>
      <section className={styles.managerDashboardTitle}>
        <div>
          <h1>
            Panel del
            <br />
            Administrador
          </h1>

          <p>Revisión Editorial</p>
        </div>

        <span className={styles.managerDashboardBadge}>
          Estado: En Revisión
        </span>
      </section>

      {loading && (
        <p className={styles.managerDashboardMessage}>Cargando artículos...</p>
      )}

      {error && (
        <p className={styles.managerDashboardError}>{error}</p>
      )}

      <section className={styles.managerDashboardArticles}>
        {articlesInReview.map((article) => (
          <article className={styles.managerArticle} key={article.id}>
            <p className={styles.managerArticleCategory}>
              {article.author?.name || 'Editorial'}
            </p>

            <h2>{article.title}</h2>

            <div className={styles.managerArticleMeta}>
              <span>Por {article.author?.name || 'Autor'}</span>
              <span>
                {formatDate(article.createdAt || article.created_at)}
              </span>
            </div>

            <div className={styles.managerArticleActions}>
              <button type="button" onClick={() => handleApprove(article.id)}>Aprobar</button>
              <button type="button" onClick={() => handleReject(article.id)}>Rechazar</button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default ManagerDashboard
