import styles from "./Tag.module.scss";

function Tag({ children, className = "", variant = "default" }) {
  const classes = `${styles.tag} ${styles[variant]} ${className}`;

  return (
    <span className={classes} aria-label={children}>
      {children}
    </span>
  );
}

export default Tag;
