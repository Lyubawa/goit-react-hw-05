import { useEffect, useState } from "react"
import { fetchTrendingMovies } from "../movies-api";
import MovieList from "../components/MovieList/MovieList";

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        async function getData() {
    try {
        const data = await fetchTrendingMovies()
        setMovies(data);
            } catch (error) { }
            
        } getData();
        
    }, []);
    
    return (
        <div>
            <h3>Trending today</h3>
            <MovieList movies={movies} />
        </div>
    )
}