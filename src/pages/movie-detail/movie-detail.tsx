import { useParams } from "react-router-dom"
import Navbar from "../../components/navbar/navbar"
import { useGetSingleMovie } from "../../service/query/useGetSingleMovie"
import './movie-detail.css'
import { StarFilled } from "@ant-design/icons"
import { Carousel } from "antd"
const MovieDetail = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetSingleMovie(id as string)
    return (
        <div>
            <Navbar />
            <div className="movie-detail">
                {
                    isLoading ? <h1 style={{ color: '#fff' }}>Loading...</h1> : (
                        <>
                            <img src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`} alt="" />
                            <div className="movie-detail-info">
                                <div className="movie-detail-info-content">
                                    <h2>{data?.title}</h2>
                                    <div className="date-rate-detail">
                                        <p><StarFilled style={{ color: '#f5c518' }} /> {data?.vote_average.toFixed(1)}</p>
                                        <p>{data?.release_date}</p>
                                    </div>
                                    <p className="movie-genre">{data?.genres.map((genre: any) => genre.name).join(' | ')}</p>
                                    <p className="movie-overview movie-genre">{data?.overview}</p>
                                    <div className="movie-actors">
                                        <p>Actors: {data?.casts?.cast.map((actors: any) => actors.name).join(', ').slice(0, 200)}</p>
                                    </div>
                                    <Carousel autoplay className="movie-images">
                                        {
                                            data?.images.backdrops.slice(0, 10).map((backdrop: any) => {
                                                return (
                                                    <div key={backdrop.file_path} >
                                                        <img src={`https://image.tmdb.org/t/p/original/${backdrop.file_path}`} style={{ width: '100%', height: '230px', objectFit: 'cover', borderRadius: '10px' }} alt="" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </Carousel>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default MovieDetail