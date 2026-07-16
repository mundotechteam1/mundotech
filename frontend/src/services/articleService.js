import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/articles";

// Obtener artículos publicados
export const getPublishedArticles = async () => {
  const response = await axios.get(`${API_URL}/status/PUBLISHED`);

  return response.data;
};

// Obtener todos los artículos
export const getArticles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener artículo por id
export const getArticleById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Crear artículo
export const createArticle = async (article) => {
  const response = await axios.post(API_URL, article);

  return response.data;
};

// Actualizar artículo
export const updateArticle = async (id, article) => {
  const response = await axios.put(`${API_URL}/${id}`, article);

  return response.data;
};

// Eliminar artículo
export const deleteArticle = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
