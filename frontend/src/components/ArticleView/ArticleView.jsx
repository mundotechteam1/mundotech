import React from "react";
import styles from "./ArticleView.module.scss";
import processorImg from "../../assets/icons/processor.jpg";

export default function ArticleView() {
  return (
    <div className={styles.pageLayout}>
      <main className={styles.mainContent}>
        <div className={styles.articleContainer}>
          <div className={styles.articleMetaHeader}>
            <span className={styles.statusBadge}>ESTADO: EN REVISIÓN</span>
            <span>RECIBIDO: 24 DE OCTUBRE, 2023 | 09:40 AM</span>
          </div>

          <div className={styles.articleMainImage}>
            <img src={processorImg} alt="Arquitectura del procesador" />
          </div>

          <h1 className={styles.articleTitle}>
            La revolución silenciosa: cómo las arquitecturas generativas están
            rediseñando la computación periférica
          </h1>

          <div className={styles.articleAuthorBox}>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>POR JULIAN THORNE</span>
              <span className={styles.authorRole}>
                CORRESPONSAL PRINCIPAL DE TECNOLOGÍA
              </span>
            </div>
            <span className={styles.articleDate}>24 DE OCTUBRE DE 2023</span>
          </div>

          <div className={styles.articleBodyLayout}>
            <div className={styles.articleTextColumns}>
              <p>
                <span className={styles.dropCap}>D</span>urante décadas, la
                trayectoria de la informática se ha dirigido hacia la
                consolidación centralizada. Nos trasladamos de los mainframes a
                la nube, delegando el trabajo pesado de la cognición a enormes
                centros de datos refrigerados por vientos árticos. Pero se está
                produciendo una silenciosa inversión. El "borde" ya no es un
                destino periférico; se está convirtiendo en el sitio principal
                de la inteligencia.
              </p>

              <p>
                Los recientes avances en la cuantificación de modelos locales
                han permitido que las arquitecturas generativas —antes dominio
                exclusivo de los clústeres multi-GPU— residan cómodamente dentro
                de los límites de bajo consumo de los procesadores móviles y los
                sensores integrados. Esto no es solo un logro técnico; es un
                cambio de paradigma en la soberanía de los datos y la latencia.
              </p>

              <blockquote className={styles.articleBlockquote}>
                "Estamos presenciando el nacimiento de la 'Inteligencia
                Ambiental', donde el dispositivo no solo registra el mundo, sino
                que lo comprende en tiempo real sin pedir permiso a la nube."
              </blockquote>

              <p>
                En nuestras pruebas en los laboratorios de Mundo Tech,
                observamos un incremento del 300% en la velocidad de inferencia
                en los últimos chips prototipo en comparación con los flujos de
                trabajo dependientes de la nube de la generación anterior. Más
                importante aún, las implicaciones de seguridad son profundas.
                Cuando los datos nunca abandonan el hardware local, la
                superficie de ataque de la vida digital moderna se reduce de una
                red global a un solo objeto físico.
              </p>

              <p>
                Asísmo, esta descentralización conlleva su propio conjunto de
                desafíos. La gestión térmica de los motores neuronales de alta
                densidad en placas móviles sigue siendo un obstáculo
                significativo. Julian Thorne explora cómo empresas como
                NeuralLink y Terra-Silicon están abordando estas restricciones
                metalúrgicas mediante innovadoras membranas de refrigeración
                líquida.
              </p>

              <p>
                A medida que nos adentramos en el próximo año fiscal, la
                narrativa de 'La Nube' podría comenzar a evaporarse, reemplazada
                por una realidad local más conectada a tierra, más privada e
                infinitamente más rápida. La revolución no será televisada; se
                computará en tu bolsillo, silenciosamente.
              </p>
            </div>
          </div>

          <div className={styles.editorialNotesSection}>
            <label>AÑADIR NOTA EDITORIAL</label>
            <textarea placeholder="Proporcione comentarios al autor o notas internas para el consejo editorial..."></textarea>
            <div className={styles.editorialActions}>
              <button className={styles.btnApprove} type="button">
                ✓ APROBAR Y PUBLICAR
              </button>
              <button className={styles.btnReject} type="button">
                ⤶ RECHAZAR Y DEVOLVER AL AUTOR
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
