import { useState } from "react";
import axios from "axios";
import styles from "./ArticleEditor.module.scss";

export default function ArticleEditor({ isEditorOpen, setIsEditorOpen }) {
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = "05/24/2024";

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      if (selectedFiles.length > 5) {
        alert("¡Error! No puedes seleccionar más de 5 imágenes.");
        return;
      }

      setImages(selectedFiles);
    }
  };

  const handleSubmit = async (e, statusType) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const articleDto = {
      title: headline,
      content: content,
      status: statusType,
      authorId: 1,
    };

    formData.append(
      "article",
      new Blob([JSON.stringify(articleDto)], { type: "application/json" }),
    );

    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post("http://localhost:8080/api/v1/articles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(`¡Éxito! Estado: ${statusType}`);
      setHeadline("");
      setContent("");
      setImages([]);
      if (setIsEditorOpen) setIsEditorOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error en el servidor backend");
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
              <div className={styles.submissionTitleText}>
                {headline || "Sin título"}
              </div>
            </div>

            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>AUTOR</span>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    value="Julius V. Thorne"
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>FECHA DE PUBLICACIÓN</span>
                <div className={styles.formGroup}>
                  <input type="text" value={today} readOnly disabled />
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
                  <span className={styles.uploadTextMain}>SUBIR IMÁGENES</span>
                  <span className={styles.uploadTextSub}>
                    Recomendado: 1600x900px | Máx 5 imágenes
                  </span>
                  {images.length > 0 && (
                    <div
                      style={{
                        marginTop: "10px",
                        color: "#4caf50",
                        fontSize: "14px",
                      }}
                    >
                      <strong>Archivos seleccionados ({images.length}):</strong>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: "5px 0 0 0",
                        }}
                      >
                        {images.map((img, index) => (
                          <li
                            key={index}
                            style={{ fontSize: "12px", color: "#555" }}
                          >
                            📎 {img.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="file-picker"
                multiple
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
