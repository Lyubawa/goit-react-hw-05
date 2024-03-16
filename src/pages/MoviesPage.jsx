import { useEffect, useState } from 'react';
import { fetchSearchMovies } from '../movies-api';
import { useSearchParams } from 'react-router-dom';
// import SearchMovies from '../components/SearchMovies/SearchMovies';
import MovieList from '../components/MovieList/MovieList';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [params, setParams] = useSearchParams();

  const moviesFilter = params.get('query') ?? '';

  const changeFilter = newFilter => {
    params.set('query', newFilter);
    setParams(params);
  };

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchSearchMovies(moviesFilter);
        setMovies(data);
      } catch (error) {}
    }
    getData();
  }, [moviesFilter]);

  const handleSubmit = event => {
    event.preventDefault();
    const inputValue = event.target.query.value.trim();
    changeFilter(inputValue);
  };

  const filterMovies = movies.filter(movie =>
    movie.query.toLowerCase().includes(moviesFilter.toLocaleLowerCase())
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="enter title of movie"
          // defaultValue={moviesFilter}
          // value={changeFilter}
        />
        <button type="submit">Search</button>
      </form>
      {/* <SearchMovies /> */}
      <MovieList movies={filterMovies} />
    </div>
  );
}
