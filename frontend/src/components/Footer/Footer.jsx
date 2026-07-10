
import styles from  "./Footer.module.scss";
function Footer() {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.footerTitle}>MUNDO TECH</h2>
      <p className={styles.footerCopy}>
        © 2026 MUNDO TECH PUBLISHING HOUSE</p>
         <p className={styles.footerCopy}>
         - TEAM 2 - 
         </p> 
     
    </footer>
  );
}

export default Footer;