// Datos de ejemplo — sustituye por tu fetch real cuando lo conectes.
// Mismo shape que espera ArticleCard.
// Las imágenes son placeholders de picsum.photos, solo para ver el layout;
// cámbialas por tus imágenes reales cuando conectes tu API/CMS.

const MOCK_ARTICLES = [
  {
    id: 1,
    image: 'https://picsum.photos/id/1015/800/500',
    imageAlt: 'Investigadores en una sala blanca trabajando con un ordenador cuántico',
    category: null,
    date: '8 julio, 2039',
    author: 'Elara Vance',
    title: 'El Horizonte Cuántico: Por Qué el Reinado del Silicio Podría Acabar Antes de lo Previsto',
    excerpt:
      'A medida que la Ley de Moore se acerca a sus límites físicos, emerge una nueva era de computación a escala subatómica. Nuestro reportaje de investigación profundiza en los laboratorios que están redefiniendo la lógica de las puertas y en la carrera geopolítica por la supremacía cuántica.',
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/1016/800/500',
    imageAlt: 'Pasillo de un centro de datos con servidores a ambos lados',
    category: null,
    date: '8 julio, 2039',
    author: 'Julian Ars',
    title: 'El Monopolio de los Cables Submarinos: ¿Quién Es Dueño de las Arterias de Internet?',
    excerpt:
      'Los cables submarinos transportan el 99% de los datos internacionales. Mapeamos los intereses privados que controlan estos enlaces vitales y lo que implica para la soberanía digital global.',
  },
  {
    id: 3,
    image: 'https://picsum.photos/id/1019/800/500',
    imageAlt: 'Máquina de escribir antigua junto a un portátil moderno',
    category: 'Mundo Tech',
    date: '6 junio, 2026',
    author: 'Dra. Helena Cho',
    title: 'El Arte Perdido del Trabajo Profundo en una Era de Scroll Infinito',
    excerpt:
      'La tecnología prometió liberar nuestro tiempo. En cambio, ha fragmentado nuestra atención. Una indagación filosófica sobre cómo recuperar el enfoque en un mundo impulsado por notificaciones.',
  },
];

export default MOCK_ARTICLES;