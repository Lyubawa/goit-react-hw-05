import axios from 'axios';

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
	Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzAyNDYxYTFjODE0Y2FkZGI3YmVmM2NjYjBkOTg2OCIsInN1YiI6IjY1ZWNkZWY3YzE1YjU1MDE2M2YxMjgyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Aq2S_H08LDacAEFfbyaOjcpZeRUHIH65JcSAH0Ft-R0'
  }
};

export const fetchTrendingMovies = async () => {
    const response = await axios.get("/trending/movie/day?language=en-US", options)
    return response.data.results;
}

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, options)
  return response.data;
}

export const fetchCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, options)
  return response.data.cast;
}

export const fetchReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, options)
  return response.data.results;
}

export const fetchSearchMovies = async (query) => {
  const response = await axios.get(`/search/movie?query=${query}}`, options)
  return response.data.results;
}