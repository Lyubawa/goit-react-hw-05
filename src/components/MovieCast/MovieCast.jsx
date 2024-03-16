import { useEffect, useState } from 'react';
import { fetchCast } from '../../movies-api';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await fetchCast(movieId);
        setCasts(data);
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
      {casts && (
        <div>
          <ul className={css.list}>
            {casts.map(cast => (
              <li className={css.item} key={cast.id}>
                <img
                  className={css.img}
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                      : `https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D`
                  }
                  alt="Cast profile"
                />
                <p className={css.text}>
                  <strong>Name:</strong> {cast.name}
                </p>
                <p className={css.text}>
                  <strong>Character:</strong> {cast.character}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}
