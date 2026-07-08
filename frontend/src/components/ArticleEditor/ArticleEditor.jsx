import { useState } from "react";
import axios from "axios";
import "./ArticleEditor.scss";

export default function ArticleEditor() {
  const [headline, setHeadline] = useState("");
  const [section, setSection] = useState("Silicon Valley");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = new Date().toLocaleDateString("en-US");

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
      section: section,
      status: statusType,
      authorId: 1
    };

    formData.append(
      "article",
      new Blob([JSON.stringify(articleDto)], { type: "application/json" })
    );

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:8080/api/articles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`¡Éxito! El artículo ha sido guardado con estado: ${statusType}`);
      setHeadline("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error al enviar el artículo:", error);
      alert("Hubo un error al conectar con el servidor backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="article-editor-container">
      <form className="article-form">
        
        <div className="meta-grid">
          <div className="form-group">
            <label>SECTION</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              disabled={loading}
            >
              <option value="Silicon Valley">Silicon Valley</option>
              <option value="Science">Science</option>
              <option value="Tech">Tech</option>
            </select>
          </div>

          <div className="form-group">
            <label>AUTHOR</label>
            <input type="text" value="Julius V. Thorne" readOnly disabled />
          </div>

          <div className="form-group">
            <label>PUBLICATION DATE</label>
            <input type="text" value={today} readOnly disabled />
          </div>
        </div>

        <div className="headline-group">
          <input
            type="text"
            placeholder="Enter Headline..."
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="headline-input"
            disabled={loading}
          />
        </div>

        <div className="image-upload-group">
          <label htmlFor="file-picker" className="upload-label">
            <div className="upload-content">
              <span className="upload-icon">📷</span>
              <span className="upload-text-main">UPLOAD LEAD IMAGERY</span>
              <span className="upload-text-sub">
                Recommend: 1600x900px | Max 5MB
              </span>
              {image && <p className="file-name">Selected: {image.name}</p>}
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

        <div className="content-group">
          <textarea
            placeholder="Start your story here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="content-textarea"
            rows="10"
            disabled={loading}
          />
        </div>

        <div className="actions-panel">
          <button 
            type="button" 
            className="btn-draft"
            onClick={(e) => handleSubmit(e, "DRAFT")}
            disabled={loading}
          >
            {loading ? "SAVING..." : "SAVE DRAFT"}
          </button>
          <button 
            type="button" 
            className="btn-review"
            onClick={(e) => handleSubmit(e, "IN_REVIEW")}
            disabled={loading}
          >
            {loading ? "SENDING..." : "SEND TO REVIEW ▷"}
          </button>
        </div>

      </form>
    </div>
  );
}
