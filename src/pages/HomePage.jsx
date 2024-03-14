import { useEffect, useState } from "react"
import { fetchTrendingMovies } from "../movies-api";
import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
// import { useLocation } from "react-router-dom";

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    // const location = useLocation();

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
        const data = await fetchTrendingMovies()
        setMovies(data);
            } catch (error) { 
                setError(true);
            }
            finally {
                setIsLoading(false);
             }
            
        } getData();
        
    }, []);
    
    return (
        <div>
            <h3>Trending today</h3>
            {isLoading && <Loader />}
            {error && <ErrorMessage />}
            <MovieList movies={movies} />
        </div>
    )
}