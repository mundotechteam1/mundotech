import { useEffect, useState } from 'react'
import styles from './AuthorDashboard.module.scss'

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

  const statusLabels = {
    DRAFT: 'Borrador',
    IN_REVIEW: 'En Revisión',
    PUBLISHED: 'Publicado',
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '27 oct 2026'
    const d = new Date(dateStr)
    if (isNaN(d)) return dateStr
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
    return `${d.getDate()} ${meses[d.getMonth()]}, ${d.getFullYear()}`
  }

  const filteredArticles =
    filter === 'ALL'
      ? articles
      : articles.filter((article) => article.status === filter)

  return (
    <div className={styles['author-dashboard']}>
      <section className={styles['author-dashboard__title']}>
        <div>
          <p className={styles['author-dashboard__subtitle']}>
            Terminal Editorial Interno
          </p>

          <h1>Panel del Autor</h1>
        </div>

        <button className={styles['author-dashboard__create-button']} type="button">
          Crear nuevo artículo
        </button>
      </section>

      <section className={styles['author-profile']}>
        <p className={styles['author-profile__label']}>Perfil del Autor</p>

        <div className={styles['author-profile__content']}>
          <div className={styles['author-profile__avatar']}>
            M
          </div>

          <div>
            <h2>M. Atrus</h2>
            <p>Analista Técnico Senior</p>
          </div>
        </div>

        <div className={styles['author-profile__stats']}>
          <span>Total Publicados</span>
          <strong>
            {
              articles.filter((article) => article.status === 'PUBLISHED')
                .length
            }
          </strong>
        </div>

        <div className={styles['author-profile__stats']}>
          <span>Ciclos de Revisión</span>
          <strong>
            {
              articles.filter((article) => article.status === 'IN_REVIEW')
                .length
            }
          </strong>
        </div>
      </section>

      <section className={styles['author-filters']}>
        <span>Filtrar por:</span>

        <button
          type="button"
          className={filter === 'ALL' ? styles['active'] : ''}
          onClick={() => setFilter('ALL')}
        >
          Todos
        </button>

        <button
          type="button"
          className={filter === 'DRAFT' ? styles['active'] : ''}
          onClick={() => setFilter('DRAFT')}
        >
          Borrador
        </button>

        <button
          type="button"
          className={filter === 'IN_REVIEW' ? styles['active'] : ''}
          onClick={() => setFilter('IN_REVIEW')}
        >
          En Revisión
        </button>

        <button
          type="button"
          className={filter === 'PUBLISHED' ? styles['active'] : ''}
          onClick={() => setFilter('PUBLISHED')}
        >
          Publicados
        </button>
      </section>

      {loading && (
        <p className={styles['author-dashboard__message']}>Cargando artículos...</p>
      )}

      {error && (
        <p className={styles['author-dashboard__error']}>{error}</p>
      )}

      <section className={styles['author-articles']}>
        {filteredArticles.map((article) => (
          <article className={styles['author-card']} key={article.id}>
            <div className={styles['author-card__meta']}>
              <span className={`${styles['author-card__status']} ${styles[`status-${article.status}`]}`}>
                {statusLabels[article.status] || article.status}
              </span>

              <span>
                {formatDate(article.createdAt || article.created_at)}
              </span>
            </div>

            <h2>{article.title}</h2>

            <p className={styles['author-card__content']}>
              {article.content}
            </p>

            <div className={styles['author-card__actions']}>
              {article.status === 'DRAFT' && (
                <button className={styles['primary-action']} type="button">
                  Enviar a revisión
                </button>
              )}

              {article.status === 'IN_REVIEW' && (
                <button className={styles['secondary-action']} type="button">
                  Pendiente de aprobación
                </button>
              )}

              {article.status === 'PUBLISHED' && (
                <button className={styles['secondary-action']} type="button">
                  Ver publicado
                </button>
              )}

              <button className={`${styles['icon-action']} ${styles['delete']}`} type="button">
                ×
              </button>

              <button className={`${styles['icon-action']} ${styles['edit']}`} type="button">
                ✎
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className={styles['author-pagination']}>
        <button type="button">Anterior</button>
        <button className={styles['active']} type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">Siguiente</button>
      </section>
    </div>
  )
}

export default AuthorDashboard
