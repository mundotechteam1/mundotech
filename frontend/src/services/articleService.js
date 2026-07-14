
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/articles";

// Obtener todos los artículos
export const getArticles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener un artículo por ID
export const getArticleById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Crear un artículo
export const createArticle = async (article, authorId) => {
  const response = await axios.post(
    `${API_URL}?authorId=${authorId}`,
    article
  );
  return response.data;
};

// Actualizar un artículo
export const updateArticle = async (id, article) => {
  const response = await axios.put(`${API_URL}/${id}`, article);
  return response.data;
};

// Eliminar un artículo
export const deleteArticle = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};