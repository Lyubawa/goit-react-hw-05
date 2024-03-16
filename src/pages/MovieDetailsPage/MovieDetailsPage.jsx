import { useEffect, useState, useRef, Suspense } from 'react';
import { fetchMovieDetails } from '../../movies-api';
import {
  useParams,
  NavLink,
  Outlet,
  Link,
  useLocation,
} from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  return (
    <div>
      <Link to={backLinkRef.current} className={css.svgBackHome}>
        <FaLongArrowAltLeft /> Go home
      </Link>
      {movieDetails && (
        <div className={css.container}>
          <img
            className={css.img}
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : `https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D`
            }
            alt="Movie Poster"
          />
          <div className={css.box}>
            <h2 className={css.title}>
              {movieDetails.title} ({movieDetails.release_date.split('-')[0]})
            </h2>
            <p className={css.text}>
              User Score: {Math.round(movieDetails.vote_average * 10)}%
            </p>
            <h4 className={css.title}>Overview:</h4>
            <p className={css.text}>{movieDetails.overview}</p>
            <h4 className={css.title}>Genres: </h4>
            <ul className={css.list}>
              {movieDetails.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <p>Additional information</p>
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}
