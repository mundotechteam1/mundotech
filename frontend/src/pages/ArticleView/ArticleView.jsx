import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./articleview.module.scss";
import processorImg from "../../assets/icons/processor.jpg";

export default function ArticleView() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editorialNote, setEditorialNote] = useState("");

  const getUserInfo = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch {
      return null;
    }
  };

  const user = getUserInfo();
  const isManager = user?.roles?.includes("MANAGER");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/v1/articles/${id || 1}`,
        );
        if (!response.ok) {
          throw new Error("Error loading data");
        }
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticleData();
  }, [id]);

  const authHeaders = () => {
    const headers = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  const handleApprove = async () => {
    if (!user?.id) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/${id}/approve?managerId=${user.id}`,
        { method: "PUT", headers: authHeaders() },
      );
      if (response.ok) {
        const updated = await response.json();
        setArticle(updated);
        alert("Artículo aprobado con éxito");
      } else {
        const text = await response.text();
        alert(text || "Error al aprobar");
      }
    } catch (err) {
      console.error(err);
      alert("Error al aprobar");
    }
  };

  const handleReject = async () => {
    if (!user?.id) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/${id}/reject?managerId=${user.id}`,
        { method: "PUT", headers: authHeaders() },
      );
      if (response.ok) {
        const updated = await response.json();
        setArticle(updated);
        alert("Artículo enviado a borradores");
      } else {
        const text = await response.text();
        alert(text || "Error al rechazar");
      }
    } catch (err) {
      console.error(err);
      alert("Error al rechazar");
    }
  };

  if (loading) return <div className={styles.mainContent}>Loading...</div>;
  if (error) return <div className={styles.mainContent}>Error: {error}</div>;
  if (!article) return <div className={styles.mainContent}>Empty</div>;

  const paragraphs = article.content
    ? article.content.split(/\n\s*\n/).filter(Boolean)
    : [];

  if (paragraphs.length === 0 && article.content) {
    paragraphs.push(article.content);
  }

  return (
    <div className={styles.pageLayout}>
      <main className={styles.mainContent}>
        <div className={styles.articleContainer}>
          <div className={styles.articleMetaHeader}>
            <span className={styles.statusBadge}>ESTADO: {article.status}</span>
            <span>
              RECIBIDO:{" "}
              {article.createdAt
                ? new Date(article.createdAt).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </span>
          </div>

          {article.image && (
            <div className={styles.articleMainImage}>
              <img src={`http://localhost:8080${article.image}`} alt={article.title} />
            </div>
          )}

          <h1 className={styles.articleTitle}>{article.title}</h1>

          <div className={styles.articleAuthorBox}>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>
                Por {article.author?.name || "Autor"}
              </span>
            </div>
            <span className={styles.articleDate}>
              {article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString()
                : "No publicado"}
            </span>
          </div>

          <div className={styles.articleBodyLayout}>
            <div className={styles.articleTextColumns}>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {index === 0 ? (
                    <>
                      <span className={styles.dropCap}>
                        {paragraph.trim().charAt(0)}
                      </span>
                      {paragraph.trim().slice(1)}
                    </>
                  ) : (
                    paragraph.trim()
                  )}
                </p>
              ))}
            </div>
          </div>

          {isManager && (
            <div className={styles.editorialNotesSection}>
              <label htmlFor="editor-notes">NOTAS EDITORIALES:</label>
              <textarea
                id="editor-notes"
                value={editorialNote}
                onChange={(e) => setEditorialNote(e.target.value)}
                placeholder="Escribe una nota para el autor..."
              />
              <div className={styles.editorialActions}>
                <button className={styles.btnApprove} onClick={handleApprove}>
                  APROBAR
                </button>
                <button className={styles.btnReject} onClick={handleReject}>
                  RECHAZAR
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
