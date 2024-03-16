import { useEffect, useMemo, useState } from 'react';
import { fetchSearchMovies } from '../../movies-api';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [params, setParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const moviesFilter = params.get('query') ?? '';

  const changeFilter = newFilter => {
    params.set('query', newFilter);
    setParams(params);
  };

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await fetchSearchMovies(moviesFilter);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [moviesFilter]);

  const handleSubmit = event => {
    event.preventDefault();
    const inputValue = event.target.elements.query.value.trim();
    if (inputValue.trim() === '') {
      toast.error('Field is empty!');
      return;
    }
    changeFilter(inputValue);
  };

  const filterMovies = useMemo(() => {
    return movies.filter(
      movie =>
        movie.title &&
        movie.title.toLowerCase().includes(moviesFilter.toLocaleLowerCase())
    );
  }, [moviesFilter, movies]);

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          placeholder="enter title"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      <MovieList movies={filterMovies} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <Toaster position="top-center" />
    </div>
  );
}
