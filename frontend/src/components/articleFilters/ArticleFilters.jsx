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
    </section>
  );
}

export default ArticleFilters;
