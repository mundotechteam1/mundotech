import { useState } from "react";
import "./ArticleEditor.scss";

export default function ArticleEditor() {
  const [headline, setHeadline] = useState("");
  const [section, setSection] = useState("Silicon Valley");
  const [content, setContent] = useState("");

  return (
    <div className="article-editor-container">
      <form className="article-form">
        <div className="meta-grid">
          <div className="form-grup">
            <label>Section</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="Silicon Valley">Silicon Valley</option>
              <option value="Science">Science</option>
              <option value="Tech">Tech</option>
            </select>
          </div>

          <div className="form-grup">
            <label>
              <AUTHOR></AUTHOR>
            </label>
            <input type="text" value="Julius V. Thorne" readOnly disabled />
          </div>
        </div>

        <div className="headline-grup">
          <input
            type="text"
            placeholder="Enter Headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="headline-input"
          />
        </div>
      </form>
    </div>
  );
}
