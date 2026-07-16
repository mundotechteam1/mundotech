import styles from "./ArticleFilters.module.scss";

const FILTERS = [
  { value: "ALL", label: "Todos" },
  { value: "DRAFT", label: "Borrador" },
  { value: "IN_REVIEW", label: "En Revisión" },
  { value: "PUBLISHED", label: "Publicados" },
];

function ArticleFilters({ filter, onFilterChange }) {
  return (
    <section className={styles.articleFilters}>
      <span>Filtrar por:</span>

      <div className={styles.buttonsRow}>
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={filter === value ? styles.active : ""}
            onClick={() => onFilterChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default ArticleFilters;
