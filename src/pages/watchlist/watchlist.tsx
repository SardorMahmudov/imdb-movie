import { Card } from "antd";
import Navbar from "../../components/navbar/navbar";
import { useCartStore } from "../../store/cart"
import './watchlist.css'
import { Link } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";
import { BsBookmarkPlus, BsBookmarkPlusFill } from "react-icons/bs";
const Watchlist = () => {
    const { cart, add, remove } = useCartStore()
    console.log(cart);

    return (
        <>
            <Navbar />
            <div className="watchlist">
                <h1 className="watchlist-title">Watchlist {cart.length}</h1>
                <div className='movie-list'>
                    {
                        cart?.map((movie: any) => {
                            return (
                                <Card key={movie.id} cover={
                                    <Link to={`/movie-detail/${movie.id}`} key={movie.id} style={{ height: '180px', objectFit: 'cover' }}>
                                        <img alt="example" src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Link>} >
                                    <h3 className='movie-title-top'>{movie?.title.length > 15 ? movie?.title.slice(0, 15) + '...' : movie?.title}</h3>
                                    <div className="movie-rated-info">
                                        <strong className="movie-top-rate"><StarOutlined style={{ color: '#f5c518' }} /> {movie?.vote_average.toFixed(1)} </strong>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <p className="movie-rated-date">{movie?.release_date.slice(0, 4)}</p>
                                            {cart?.findIndex((likeproduct: any) => likeproduct.id === movie.id) !==
                                                -1 ? (
                                                <button className='movie-btn-rated-fill' onClick={() => remove(movie?.id)}>
                                                    <BsBookmarkPlusFill />
                                                </button>
                                            ) : (
                                                <button className='movie-btn-rated' onClick={() => add(movie)}>
                                                    <BsBookmarkPlus />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Watchlist