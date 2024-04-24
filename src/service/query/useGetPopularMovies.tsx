import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useGetPopularMovies = () => {
    return useQuery({
        queryKey: ["popular-movies"],
        queryFn: () => {
            return request.get(`/3/movie/popular?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US&page=1`).then((res) => res.data.results);
        },
    });
};