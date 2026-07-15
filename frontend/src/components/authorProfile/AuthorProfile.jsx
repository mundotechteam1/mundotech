import styles from "./AuthorProfile.module.scss";

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function AuthorProfile({ author, totalPublished, reviewCycles }) {
  return (
    <section className={styles.authorProfile}>
      <p className={styles.authorProfileLabel}>Perfil del Autor</p>

      <div className={styles.authorProfileContent}>
        <div className={styles.authorProfileAvatar}>
          {getInitials(author?.name)}
        </div>

        <div>
          <h2>{author?.name || "Autor"}</h2>
        </div>
      </div>

      <div className={styles.statRow}>
        <span>Total Publicados</span>
        <strong>{totalPublished}</strong>
      </div>

      <div className={styles.statRow}>
        <span>Ciclos de Revisión</span>
        <strong>{reviewCycles}</strong>
      </div>
    </section>
  );
}

export default AuthorProfile;
