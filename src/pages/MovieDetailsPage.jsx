import { useEffect, useState } from "react"
import { fetchMovieDetails } from "../movies-api";
import { useParams } from "react-router-dom";

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    
    useEffect(() => {
        async function getData() {
            try {
                const data = await fetchMovieDetails(movieId)
                setMovieDetails(data);
            } catch (error) {}
        } getData();
    }, [movieId])
    
    return (
        <div>Hello: {movieId}
            {movieDetails && <div>
                <p>Overview: {movieDetails.overview}</p>
            </div>}
        </div>
    )
}