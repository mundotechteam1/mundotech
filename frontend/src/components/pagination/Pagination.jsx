import styles from './Pagination.module.scss'

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50]

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) {
  if (totalPages <= 1 && totalItems <= itemsPerPage) return null

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <section className={styles.pagination}>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          type="button"
          className={num === currentPage ? styles.active : ''}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente
      </button>

      <span className={styles.paginationInfo}>
        {totalItems} artículos &mdash;
      </span>

      <select
        className={styles.perPageSelect}
        value={itemsPerPage}
        onChange={(e) => {
          onItemsPerPageChange(Number(e.target.value))
        }}
      >
        {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt} por pág.
          </option>
        ))}
      </select>
    </section>
  )
}

export default Pagination
