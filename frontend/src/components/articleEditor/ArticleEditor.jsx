import { useState } from "react";
import axios from "axios";
import styles from "./ArticleEditor.module.scss";

export default function ArticleEditor({ isEditorOpen, setIsEditorOpen }) {
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = "05/24/2024";

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e, statusType) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", headline);
    formData.append("content", content);
    formData.append("status", statusType);
    formData.append("authorId", 1);

    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/v1/articles",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const createdArticleId = response.data.id;

      if (statusType === "IN_REVIEW" && createdArticleId) {
        await axios.put(
          `http://localhost:8080/api/v1/articles/${createdArticleId}/send-review?authorId=1`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      alert(`¡Éxito! Estado: ${statusType}`);
      setHeadline("");
      setContent("");
      setImage(null);
      if (setIsEditorOpen) setIsEditorOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error backend");
    } finally {
      setLoading(false);
    }
  };

  if (!isEditorOpen) return null;

  return (
    <div className={styles.modaloverlay} onClick={() => setIsEditorOpen(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.modalClose}
          onClick={() => setIsEditorOpen(false)}
        >
          ×
        </button>
        <div className={styles.articleEditorContainer}>
          <form className={styles.articleForm}>
            <div className={styles.submissionBox}>
              <div className={styles.badgeStatus}>
                <span className={styles.tagNew}>NUEVO BORRADOR</span>
                <span className={styles.tagId}>/ #4429</span>
              </div>
              <div
                className={styles.submissionTitleText}
                style={{ minHeight: "24px", color: "#000", fontWeight: "bold" }}
              >
                {headline.trim() !== "" ? headline : "Sin título..."}
              </div>
            </div>

            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>AUTOR</span>
                <div className={styles.formGroup}>
                  <input type="text" defaultValue="Julius V. Thorne" disabled />
                </div>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>FECHA DE PUBLICACIÓN</span>
                <div className={styles.formGroup}>
                  <input type="text" defaultValue={today} disabled />
                </div>
              </div>
            </div>

            <div className={styles.headlineGroup}>
              <input
                type="text"
                placeholder="Título..."
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className={styles.headlineInput}
                disabled={loading}
              />
            </div>

            <div className={styles.uploadGroup}>
              <label htmlFor="file-picker" className={styles.uploadLabel}>
                <div className={styles.uploadContent}>
                  <span className={styles.uploadIcon}>📷</span>
                  <span className={styles.uploadTextMain}>SUBIR IMAGEN </span>
                  <span className={styles.uploadTextSub}>
                    Recomendado: 1600x900px | Máx 5MB
                  </span>
                  {image && (
                    <p className={styles.fileName}>Selected: {image.name}</p>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="file-picker"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                disabled={loading}
              />
            </div>

            <div className={styles.contentGroup}>
              <textarea
                placeholder="Escribe tu historia aquí..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={styles.contentTextarea}
                rows="8"
                disabled={loading}
              />
            </div>

            <div className={styles.actionsFooterBar}>
              <button
                type="button"
                className={styles.btnDraft}
                onClick={(e) => handleSubmit(e, "DRAFT")}
                disabled={loading}
              >
                GUARDAR BORRADOR
              </button>
              <button
                type="button"
                className={styles.btnReview}
                onClick={(e) => handleSubmit(e, "IN_REVIEW")}
                disabled={loading}
              >
                ENVIAR A REVISIÓN ▷
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
