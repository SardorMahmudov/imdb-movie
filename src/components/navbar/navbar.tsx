import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import { Badge, Button, Flex, Image, Typography } from 'antd'
import './navbar.css'
import { useState } from 'react'
import { useCartStore } from '../../store/cart'
import useDebounce from '../../config/use-debounce'
import { useGetSearchMovies } from '../../service/query/useGetSearchMovies'
const Navbar = () => {
    const { cart } = useCartStore()
    const [search, setSearch] = useState('')
    const title = useDebounce(search)
    const { data } = useGetSearchMovies(title)
    console.log(data);

    const [showNavbar, setShowNavbar] = useState(false)
    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    return (
        <div className='navbar'>
            <div className='navbar-wrapper'>
                <Link to="/">
                    <img src={Logo} alt="" />
                </Link>
                <Flex align='center' gap={10}>
                    <div className={`search-box ${showNavbar && 'active'}`}>
                        <div className="search-wrapper">
                            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} type="text" name="search" aria-label="search movies" placeholder="Search any movies..." className="search-field" />
                            <img src="https://github.com/frdevv17/Netflix/blob/main/assets/images/search.png?raw=true" width="24" height="24" className="leading-icon" alt="" />
                            {
                                search.length > 2 ? (
                                    <div className='search'>
                                        {
                                            data?.results?.map((item: any) => (
                                                <Link onClick={() => setSearch("")} to={`/movie-detail/${item.id}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <Image preview={false} width={80} height={70} src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} style={{ objectFit: 'cover' }} alt="" />
                                                    <Typography.Title level={5} style={{ margin: 0, color: 'white' }}>{item.title}</Typography.Title>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                ) : null
                            }
                        </div>
                        <button className="search-btn" onClick={handleShowNavbar}>
                            <img src="https://github.com/frdevv17/Netflix/blob/main/assets/images/close.png?raw=true" width="24" height="24" alt="" />
                        </button>
                    </div>
                    <div className="search-btn" onClick={handleShowNavbar}>
                        <img width="24" height="24" src="https://github.com/frdevv17/Netflix/blob/main/assets/images/search.png?raw=true" alt="" />
                    </div>
                    <Link to={'/watchlist'}>
                        <Button className='nav-btn' size='large' >Watchlist <Badge size='default' count={cart.length > 0 ? cart.length : 0} color="#f5c518" /></Button>
                    </Link>
                </Flex>
            </div >
        </div>
    )
}

export default Navbar