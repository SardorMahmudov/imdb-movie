import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useGetSingleMovie = (id: string) => {
    return useQuery({
        queryKey: ["single-movie"],
        queryFn: () => {
            return request.get(`/3/movie/${id}?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&append_to_response=casts,videos,images,releases`).then((res) => res.data);
        },
    });
};