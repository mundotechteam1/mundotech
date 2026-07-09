import { useEffect, useState } from 'react'
import './AuthorDashboard.module.scss'

function AuthorDashboard() {
  const [articles, setArticles] = useState([])
  const [filter, setFilter] = useState('ALL')
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

  const filteredArticles =
    filter === 'ALL'
      ? articles
      : articles.filter((article) => article.status === filter)

  return (
    <main className="author-dashboard">
      <section className="author-dashboard__title">
        <div>
          <p className="author-dashboard__subtitle">
            Internal Editorial Terminal
          </p>

          <h1>Panel del Autor</h1>
        </div>

        <button className="author-dashboard__create-button" type="button">
          Crear nuevo artículo
        </button>
      </section>

      <section className="author-profile">
        <p className="author-profile__label">Author Profile</p>

        <div className="author-profile__content">
          <div className="author-profile__avatar">
            M
          </div>

          <div>
            <h2>M. Atrus</h2>
            <p>Senior Tech Analyst</p>
          </div>
        </div>

        <div className="author-profile__stats">
          <span>Total Published</span>
          <strong>
            {
              articles.filter((article) => article.status === 'PUBLISHED')
                .length
            }
          </strong>
        </div>

        <div className="author-profile__stats">
          <span>Review Cycles</span>
          <strong>
            {
              articles.filter((article) => article.status === 'IN_REVIEW')
                .length
            }
          </strong>
        </div>
      </section>

      <section className="author-filters">
        <span>Filtrar por:</span>

        <button
          type="button"
          className={filter === 'ALL' ? 'active' : ''}
          onClick={() => setFilter('ALL')}
        >
          Todos
        </button>

        <button
          type="button"
          className={filter === 'DRAFT' ? 'active' : ''}
          onClick={() => setFilter('DRAFT')}
        >
          Draft
        </button>

        <button
          type="button"
          className={filter === 'IN_REVIEW' ? 'active' : ''}
          onClick={() => setFilter('IN_REVIEW')}
        >
          In Review
        </button>

        <button
          type="button"
          className={filter === 'PUBLISHED' ? 'active' : ''}
          onClick={() => setFilter('PUBLISHED')}
        >
          Published
        </button>
      </section>

      {loading && (
        <p className="author-dashboard__message">Cargando artículos...</p>
      )}

      {error && (
        <p className="author-dashboard__error">{error}</p>
      )}

      <section className="author-articles">
        {filteredArticles.map((article) => (
          <article className="author-card" key={article.id}>
            <div className="author-card__meta">
              <span className={`author-card__status status-${article.status}`}>
                {article.status}
              </span>

              <span>
                {article.createdAt || article.created_at || 'OCT 27, 2026'}
              </span>
            </div>

            <h2>{article.title}</h2>

            <p className="author-card__content">
              {article.content}
            </p>

            <div className="author-card__actions">
              {article.status === 'DRAFT' && (
                <button className="primary-action" type="button">
                  Enviar a revisión
                </button>
              )}

              {article.status === 'IN_REVIEW' && (
                <button className="secondary-action" type="button">
                  Pending approval
                </button>
              )}

              {article.status === 'PUBLISHED' && (
                <button className="secondary-action" type="button">
                  Ver publicado
                </button>
              )}

              <button className="icon-action delete" type="button">
                ×
              </button>

              <button className="icon-action edit" type="button">
                ✎
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="author-pagination">
        <button type="button">Anterior</button>
        <button className="active" type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">Siguiente</button>
      </section>
    </main>
  )
}

export default AuthorDashboard