import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ArticleEditor.module.scss";
import { jwtDecode } from "jwt-decode";

export default function ArticleEditor({ isEditorOpen, setIsEditorOpen, article, onArticleUpdated }) {
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userName = decoded?.name || "Autor";
  const userId = decoded?.id;

  const today = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    if (article) {
      setHeadline(article.title || "");
      setContent(article.content || "");
      setImage(null);
      setImageRemoved(false);
    } else {
      setHeadline("");
      setContent("");
      setImage(null);
      setImageRemoved(false);
    }
  }, [article, isEditorOpen]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setImageRemoved(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageRemoved(true);
  };

  const handleSubmit = async (e, statusType) => {
    e.preventDefault();
    if (!userId) {
      alert("No se pudo identificar al usuario");
      return;
    }
    setLoading(true);

    try {
      if (article) {
        await axios.put(
          `http://localhost:8080/api/v1/articles/${article.id}?authorId=${userId}`,
          { title: headline, content },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (imageRemoved) {
          await axios.delete(
            `http://localhost:8080/api/v1/articles/${article.id}/image?authorId=${userId}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
        } else if (image) {
          const imgForm = new FormData();
          imgForm.append("file", image);
          await axios.post(
            `http://localhost:8080/api/v1/articles/${article.id}/upload-image`,
            imgForm,
            { headers: { Authorization: `Bearer ${token}` } },
          );
        }

        if (statusType === "IN_REVIEW") {
          await axios.put(
            `http://localhost:8080/api/v1/articles/${article.id}/send-review?authorId=${userId}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } },
          );
        }

        alert(`¡Artículo actualizado! Estado: ${statusType}`);
      } else {
        const formData = new FormData();
        formData.append("title", headline);
        formData.append("content", content);
        formData.append("authorId", userId);

        if (image) {
          formData.append("image", image);
        }

        const response = await axios.post(
          "http://localhost:8080/api/v1/articles",
          formData,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const createdArticleId = response.data.id;

        if (statusType === "IN_REVIEW" && createdArticleId) {
          await axios.put(
            `http://localhost:8080/api/v1/articles/${createdArticleId}/send-review?authorId=${userId}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } },
          );
        }

        alert(`¡Éxito! Estado: ${statusType}`);
      }

      setHeadline("");
      setContent("");
      setImage(null);
      setImageRemoved(false);
      if (onArticleUpdated) onArticleUpdated();
      if (setIsEditorOpen) setIsEditorOpen(false);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || error.message || "Error backend";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isEditorOpen) return null;

  const currentImageUrl = article?.image
    ? `http://localhost:8080${article.image}`
    : null;
  const hasExistingImage = !imageRemoved && currentImageUrl && !image;

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
                <span className={styles.tagNew}>{article ? "EDITANDO" : "NUEVO BORRADOR"}</span>
                <span className={styles.tagId}>/ #{article ? article.id : "Nuevo"}</span>
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
                  <input type="text" defaultValue={userName} disabled />
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

              {image && (
                <div className={styles.imagePreviewContainer}>
                  <p className={styles.fileName}>Nueva: {image.name}</p>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className={styles.imagePreview}
                  />
                  <button
                    type="button"
                    className={styles.removeImageBtn}
                    onClick={handleRemoveImage}
                    disabled={loading}
                  >
                    Quitar imagen
                  </button>
                </div>
              )}

              {hasExistingImage && (
                <div className={styles.imagePreviewContainer}>
                  <p className={styles.fileName}>Imagen actual</p>
                  <img
                    src={currentImageUrl}
                    alt="Current"
                    className={styles.imagePreview}
                  />
                  <button
                    type="button"
                    className={styles.removeImageBtn}
                    onClick={handleRemoveImage}
                    disabled={loading}
                  >
                    Eliminar imagen
                  </button>
                </div>
              )}

              {imageRemoved && !image && (
                <p className={styles.fileName}>Imagen eliminada</p>
              )}
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
