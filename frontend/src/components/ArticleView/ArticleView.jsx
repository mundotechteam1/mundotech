import React from "react";
import "./ArticleView.scss";

import processorImg from "../../assets/processor.jpg";
import authorImg from "../../assets/author.jpg";

export default function ArticleView() {
  return (
    <div className="page-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>MT</h2>
          <span>EDITORIAL DESK</span>
        </div>
        <nav className="sidebar-menu">
          <a href="#frontpage" className="menu-item">
            <svg
              className="menu-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M15 18h-5" />
              <path d="M10 6h8v4h-8V6Z" />
            </svg>
            Frontpage
          </a>
          <a href="#drafts" className="menu-item">
            <svg
              className="menu-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
            My Drafts
          </a>
          <a href="#submissions" className="menu-item active">
            <svg
              className="menu-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 11 3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            Submissions
          </a>
        </nav>
      </aside>

      <main className="main-content">
        <div className="article-container">
          <div className="article-meta-header">
            <span className="status-badge">STATUS: IN REVIEW</span>
            <span className="priority">PRIORITY: HIGH</span>
            <span className="submission-id">SUBMISSION ID: MT-80321-ARC</span>
          </div>

          <div className="article-main-image">
            <img src={processorImg} alt="Processor architecture" />
            <p className="image-caption">
              Fig 1.0: The architecture of next-generation silicon. Photo by
              Elena Vance.
            </p>
          </div>

          <h1 className="article-title">
            The Silent Revolution: How Generative Architectures are Redefining
            Peripheral Computing
          </h1>

          <div className="article-author-box">
            <img
              src={authorImg}
              alt="Julian Thorne"
              className="author-avatar"
            />
            <div className="author-info">
              <span className="author-name">BY JULIAN THORNE</span>
              <span className="author-role">LEAD TECHNOLOGY CORRESPONDENT</span>
            </div>
            <span className="article-date">OCTOBER 24, 2023</span>
          </div>

          <div className="article-body-layout">
            <div className="article-text-columns">
              <p>
                <span className="drop-cap">F</span>or decades, the trajectory of
                computing has been towards central consolidation. We moved from
                the mainframe to the cloud, offloading the heavy lifting of
                cognition to massive data centers cooled by arctic winds. But a
                quiet inversion is taking place. The "edge" is no longer a
                peripheral destination; it is becoming the primary site of
                intelligence.
              </p>

              <p>
                The recent breakthroughs in local model quantization have
                allowed generative architectures—previously the sole domain of
                multi-GPU clusters—to reside comfortably within the low-wattage
                confines of mobile processors and embedded sensors. This isn't
                just a technical achievement; it's a paradigm shift in data
                sovereignty and latency.
              </p>

              <blockquote className="article-blockquote">
                "We are witnessing the birth of 'Ambient Intelligence'—where the
                device doesn't just record the world, it understands it in
                real-time without asking for permission from the cloud."
              </blockquote>

              <p>
                In our testing at the Mundo Tech labs, we observed a 300%
                increase in inferencing speed on the latest prototype chips
                compared to the previous generation's cloud-dependent workflows.
                More importantly, the security implications are profound. When
                the data never leaves the local hardware, the attack surface of
                the modern digital life shrinks from a global network to a
                single physical object.
              </p>

              <p>
                However, this decentralization comes with its own set of
                challenges. The thermal management of high-density neural
                engines on mobile boards remains a significant hurdle. Julian
                Thorne explores how companies like NeuralLink and Terra-Silicon
                are approaching these metallurgical constraints through
                innovative liquid-cooling membranes.
              </p>

              <p>
                As we move into the next fiscal year, the narrative of 'The
                Cloud' may begin to evaporate, replaced by a more grounded, more
                private, and infinitely faster local reality. The revolution
                won't be televised; it will be computed in your pocket,
                silently.
              </p>
            </div>
          </div>

          <div className="editorial-notes-section">
            <label>ADD EDITORIAL NOTE</label>
            <textarea placeholder="Provide feedback to the author or internal notes for the editorial board..."></textarea>
            <div className="editorial-actions">
              <button className="btn-approve">APPROVE & PUBLISH</button>
              <button className="btn-reject">REJECT & RETURN TO AUTHOR</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
