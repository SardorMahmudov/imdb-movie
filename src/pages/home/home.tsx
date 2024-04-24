import Banner from "../../components/banner/banner"
import MovieList from "../../components/movie-list/movie-list"
import Navbar from "../../components/navbar/navbar"
const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <Banner />
            <MovieList />
        </div>
    )
}

export default Home