import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../movies-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                const data = await fetchReviews(movieId)
                setReviews(data);
            } catch (error) {
                setError(true);
            }
            finally {
                setIsLoading(false);
            }
        } getData();
    }, [movieId])
    
    return (
        <div>
            <ul>
                {reviews && reviews.length > 0 ? (reviews.map((review) => {
                    return (
                        <li key={review.id}>
                            <p>Author: {review.author}</p>
                            <p>Content: {review.content}</p>
                        </li>
                    );
                    })) : (<p>We do not have any reviews for this movie.</p>)
                }
            </ul>
            {isLoading && <Loader />}
            {error && <ErrorMessage />}
        </div>
    )
}