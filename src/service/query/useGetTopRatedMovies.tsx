import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useGetTopRatedMovies = () => {
    return useQuery({
        queryKey: ["top-rated-movies"],
        queryFn: () => {
            return request.get(`/3/movie/top_rated?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US&page=1`).then((res) => res.data.results);
        },
    });
};