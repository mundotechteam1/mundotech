import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./articleview.module.scss";
import processorImg from "../../assets/icons/processor.jpg";

export default function ArticleView() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editorialNote, setEditorialNote] = useState("");

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

  const handleApprove = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/${id || 1}/approve?managerId=1`,
        {
          method: "PUT",
        },
      );
      if (response.ok) {
        const updated = await response.json();
        setArticle(updated);
        alert("Artículo aprobado con éxito");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/articles/${id || 1}?authorId=1`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: article.title,
            content: article.content,
            status: "DRAFT",
          }),
        },
      );
      if (response.ok) {
        const updated = await response.json();
        setArticle(updated);
        alert("Artículo enviado a borradores");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className={styles.mainContent}>Loading...</div>;
  if (error) return <div className={styles.mainContent}>Error: {error}</div>;
  if (!article) return <div className={styles.mainContent}>Empty</div>;

  const rawParagraphs = article.content
    ? article.content.split(/(?<=\.)\s+/)
    : [];
  const articleParagraphs = [];

  if (rawParagraphs.length > 0) {
    if (rawParagraphs.length <= 2) {
      articleParagraphs.push(...rawParagraphs);
    } else {
      const mid = Math.ceil(rawParagraphs.length / 2);
      articleParagraphs.push(rawParagraphs.slice(0, mid).join(" "));
      articleParagraphs.push(rawParagraphs.slice(mid).join(" "));
    }
  }

  return (
    <div className={styles.pageLayout}>
      <main className={styles.mainContent}>
        <div className={styles.articleContainer}>
          <div className={styles.articleMetaHeader}>
            <span className={styles.statusBadge}>ESTADO: {article.status}</span>
            <span>
              RECIBIDO:{" "}
              {article.created_at
                ? new Date(article.created_at).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </span>
          </div>

          <div className={styles.articleMainImage}>
            <img src={processorImg} alt="Processor" />
          </div>

          <h1 className={styles.articleTitle}>{article.title}</h1>

          <div className={styles.articleAuthorBox}>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>
                Por {article.author?.name || "Autor"}
              </span>
            </div>
            <span className={styles.articleDate}>
              {article.published_at
                ? new Date(article.published_at).toLocaleDateString()
                : "No publicado"}
            </span>
          </div>

          <div className={styles.articleBodyLayout}>
            <div className={styles.articleTextColumns}>
              {articleParagraphs.map((paragraph, index) => (
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
        </div>
      </main>
    </div>
  );
}
