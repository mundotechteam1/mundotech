import { useEffect, useState } from 'react'
import './ManagerDashboard.module.scss'

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

  const articlesInReview = articles.filter(
    (article) => article.status === 'IN_REVIEW'
  )

  return (
    <main className="manager-dashboard">
      <section className="manager-dashboard__title">
        <div>
          <h1>
            Panel del
            <br />
            Manager
          </h1>

          <p>Queer Editorial Review</p>
        </div>

        <span className="manager-dashboard__badge">
          Status: In Review
        </span>
      </section>

      {loading && (
        <p className="manager-dashboard__message">Cargando artículos...</p>
      )}

      {error && (
        <p className="manager-dashboard__error">{error}</p>
      )}

      <section className="manager-dashboard__articles">
        {articlesInReview.map((article) => (
          <article className="manager-article" key={article.id}>
            <p className="manager-article__category">
              {article.author?.name || 'Editorial'}
            </p>

            <h2>{article.title}</h2>

            <div className="manager-article__meta">
              <span>By {article.author?.name || 'Author'}</span>
              <span>
                {article.createdAt || article.created_at || 'Oct 27, 2026'}
              </span>
            </div>

            <div className="manager-article__actions">
              <button type="button">Aprobar</button>
              <button type="button">Rechazar</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default ManagerDashboard