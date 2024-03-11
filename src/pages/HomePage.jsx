import { useEffect } from "react"
import { fetchMovies } from "../movies-api";

export default function HomePage() {
    useEffect(() => {
        async function getData() {
    try {
        const data = await fetchMovies()
        console.log(data);
            } catch (error) { }
            
        } getData();
        
    }, []);
    
    return (
        <div><h1>Home</h1></div>
    )
}