import { useState } from "react";
import axios from "axios";
import styles from "./ArticleEditor.module.scss";

export default function ArticleEditor({ onClose }) {
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

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:8080/api/v1/articles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(`¡Éxito! Estado: ${statusType}`);
      setHeadline("");
      setContent("");
      setImage(null);
      if (onClose) onClose();
    } catch (error) {
      console.error(error);
      alert("Error backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["article-editor-container"]}>
      <form className={styles["article-form"]}>
        <div className={styles["submission-box"]}>
          <div className={styles["badge-status"]}>
            <span className={styles["tag-new"]}>NEW DRAFT</span>
            <span className={styles["tag-id"]}>/ #4429</span>
          </div>
          <div className={styles["submission-title-text"]}>
            Untitled Submission
          </div>
        </div>

        <div className={styles["meta-grid"]}>
          <div className={styles["meta-item"]}>
            <span className={styles["meta-label"]}>AUTHOR</span>
            <div className={styles["form-group"]}>
              <input type="text" value="Julius V. Thorne" readOnly disabled />
            </div>
          </div>

          <div className={styles["meta-item"]}>
            <span className={styles["meta-label"]}>PUBLICATION DATE</span>
            <div className={styles["form-group"]}>
              <input type="text" value={today} readOnly disabled />
            </div>
          </div>
        </div>

        <div className={styles["headline-group"]}>
          <input
            type="text"
            placeholder="Enter Headline..."
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className={styles["headline-input"]}
            disabled={loading}
          />
        </div>

        <div className={styles["image-upload-group"]}>
          <label htmlFor="file-picker" className={styles["upload-label"]}>
            <div className={styles["upload-content"]}>
              <span className={styles["upload-icon"]}>📷</span>
              <span className={styles["upload-text-main"]}>
                UPLOAD LEAD IMAGERY
              </span>
              <span className={styles["upload-text-sub"]}>
                Recommend: 1600x900px | Max 5MB
              </span>
              {image && (
                <p className={styles["file-name"]}>Selected: {image.name}</p>
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

        <div className={styles["content-group"]}>
          <textarea
            placeholder="Start your story here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles["content-textarea"]}
            rows="8"
            disabled={loading}
          />
        </div>

        <div className={styles["actions-footer-bar"]}>
          <button
            type="button"
            className={styles["btn-draft"]}
            onClick={(e) => handleSubmit(e, "DRAFT")}
            disabled={loading}
          >
            SAVE DRAFT
          </button>
          <button
            type="button"
            className={styles["btn-review"]}
            onClick={(e) => handleSubmit(e, "IN_REVIEW")}
            disabled={loading}
          >
            SEND TO REVIEW ▷
          </button>
        </div>
      </form>
    </div>
  );
}
