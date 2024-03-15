import { useEffect, useState } from 'react';
import { fetchSearchMovies } from '../movies-api';
import { useSearchParams } from 'react-router-dom';
// import SearchMovies from "../components/SearchMovies/SearchMovies";

export default function MoviesPage() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [params, setParams] = useSearchParams();

  const moviesFilter = params.get('query') ?? '';
  const changeMovieFilter = newFilter => {
    params.set('query', newFilter);
    setParams(params);
  };

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchSearchMovies(moviesFilter);
        setSearchMovies(data);
      } catch (error) {}
    }
    getData();
  }, [moviesFilter]);

  const handleSubmit = event => {
    event.preventDefault();

    const inputValue = event.target.elements.query.value;
    changeMovieFilter(inputValue);
    setSearchMovies(fetchSearchMovies(inputValue));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          value={moviesFilter}
          onChange={e => changeMovieFilter(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
