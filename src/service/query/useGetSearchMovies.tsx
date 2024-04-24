import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useGetSearchMovies = (title = '') => {
    return useQuery({
        queryKey: ["search-movies", title],
        queryFn: () => {
            return request.get(`/3/search/movie?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&query=${title}&include_adult=false&language=en-US&page=1`).then((res) => res.data);
        },
    });
};