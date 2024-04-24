import { Button, Carousel, Skeleton } from "antd";
import { useGetPopularMovies } from "../../service/query/useGetPopularMovies"
import './banner.css'
import { Link } from "react-router-dom";
const Banner = () => {
    const { data, isLoading } = useGetPopularMovies()
    return (
        <div>
            <Carousel autoplay touchMove>
                {
                    data?.slice(2, 12).map((movie: any) => {
                        return (
                            <div key={movie.id}>
                                <div className="banner-carousel" style={{ background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center' }}  >
                                    <div className="banner-content">
                                        <div className="movie-info-banner">
                                            <h1 className="banner-title">{movie?.title}</h1>
                                            <div className="date-rate">
                                                <p className="movie-date">{movie?.release_date.slice(0, 4)}</p>
                                                <p className="movie-rate">{movie?.vote_average.toFixed(1)} <i className="fa-solid fa-star"></i></p>
                                            </div>
                                            <p className="movie-overview">{movie?.overview}</p>
                                            <Link to={`/movie-detail/${movie.id}`}>
                                                <Button size="large" className="movie-btn">View More</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Carousel>
            {
                isLoading && <Skeleton avatar paragraph active loading style={{ width: '100%', height: '600px' }} />
            }
        </div>
    )
}

export default Banner