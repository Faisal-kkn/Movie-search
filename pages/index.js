import { useEffect, useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { AiFillPlayCircle, AiOutlineEye } from 'react-icons/ai';
import Link from 'next/link';

import { useSelector, useDispatch } from 'react-redux'
import { storeSearchValue, selectValue, selectSearchData } from '../slices/searchSlice'

import Header from '../components/Header';
import Carousels from '@/components/Carousels';

const navItems = [
  { href: '/', label: 'Movies' },
  { href: '/popular', label: 'TV Show' },
  { href: '/top-rated', label: 'Animation' },
  { href: '/upcoming', label: 'Plans' },
];


const HomePage = () => {

  const dispatch = useDispatch()

  const searchMovies = useSelector(selectValue)
  const searchData = useSelector(selectSearchData)

  const [currentPage, setCurrentPage] = useState(1);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const PUBLIC_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const searchMovie = async (value) => {
    setCurrentPage(value)
    try {
      const searchResponse = await fetch(`${PUBLIC_URL}/search/movie?query=${searchData}&api_key=${API_KEY}&language=en-US&page=${value}`);
      const searchResults = await searchResponse.json();
      dispatch(storeSearchValue(searchResults))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const pageNumbers = [];
  const limit = searchMovies?.total_pages;
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i < 1) continue;
    if (i > limit) break;
    pageNumbers.push(i);
  }
  useEffect(() => {
    fetchMovies();

    async function fetchMovies() {
      try {
        const popularResponse = await fetch(`${PUBLIC_URL}/movie/popular?api_key=${API_KEY}&language=en-US`);
        const popularData = await popularResponse.json();
        setPopularMovies(popularData);

        const upcomingResponse = await fetch(`${PUBLIC_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`);
        const upcomingData = await upcomingResponse.json();
        setUpComingMovies(upcomingData);

        const nowPlayingResponse = await fetch(`${PUBLIC_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`);
        const nowPlayingData = await nowPlayingResponse.json();
        setNowPlayingMovies(nowPlayingData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }, []);


  return (
    <div>
      <Header logoText="MOVEA" navItems={navItems} />
      <div className="max-w-screen-xl flex flex-wrap justify-between mx-auto p-2 md:p-4 pt-0 gap-3 border-gray-700 border-0 md:border-t">
        <div className=" hidden md:block border-0 md:border-1 border-white text-white p-4 w-full md:w-1/3 lg:w-1/4">
          <div className="flex items-center justify-between border-gray-700 mb-5">
            <h1 className="text-2xl font-medium">New Trailers</h1>
            <h1 className="text-xs font-medium flex items-center">
              <span className="text-gray-400 mr-2 font-normal">Sort By</span>
              Today <FaSort className="w-3 h-3" />
            </h1>
          </div>

          {nowPlayingMovies?.results?.map((movie) => (
            <SingleMovie
              img={`url(https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ''})`}
              views={movie.vote_average + 'M'}
              title={movie.original_title}
              ago={movie.release_date}
              key={movie.title}
            />
          )).slice(0, 9)}
        </div>
        <div className="border-r border-gray-700 min-h-screen w-[1px] hidden md:block" />
        <div className="border-1 border-white text-white flex-1 py-4">
          {
            searchData != '' && searchMovies.results ? (
              searchMovies?.total_results === 0 ? <h1>movie not found</h1> :
                (
                  <>
                    <div className="grid grid-col-1 md:grid-cols-2 gap-6 mt-5">

                      {searchMovies.results?.map((movie, index) => (
                        <SearchMovie
                          img={`url(https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ''})`}
                          views={movie.vote_average + 'M'}
                          title={movie.original_title}
                          ago={movie.release_date}
                          key={'movie-' + index}
                        />
                      ))}

                    </div>
                    {
                      searchMovies.total_results > 20 &&
                      <nav className='mt-8'>
                        <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
                          {
                            currentPage - 1 >= 1 && <li>
                                <button onClick={() => searchMovie(currentPage - 1)} className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700 ">
                                <MdKeyboardArrowLeft className="w-5 h-5" />
                              </button>
                            </li>
                          }

                          {
                            pageNumbers.map(page => {
                              return (
                                <li key={page}>
                                  <button onClick={() => searchMovie(page)} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === page && 'bg-gray-300'}`} disabled={currentPage === page && true}>{page}</button>
                                </li>
                              )
                            })
                          }
                          {
                              currentPage + 1 <= limit && <li>
                                <button onClick={() => searchMovie(currentPage+1)} className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
                                <MdKeyboardArrowRight className="w-5 h-5" />
                              </button>
                            </li>
                          }
                        </ul>
                      </nav>
                    }
                  </>
                )
            ) : (
              <>
                <Carousels slides={popularMovies?.results} />
                <div className="flex items-center justify-between mt-8">
                  <h1 className="text-2xl font-medium">Upcoming Movies</h1>
                  <h1 className="text-base font-medium flex items-center text-gray-400">
                    All movies <MdKeyboardArrowRight className="w-5 h-5" />
                  </h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
                  {Array.isArray(upComingMovies?.results) &&
                    upComingMovies?.results.map((movie) => (
                      <SingleMovie
                        img={`url(https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ''})`}
                        views={movie.vote_average + 'M'}
                        title={movie.original_title}
                        ago={movie.release_date}
                        key={movie.title}
                      />
                    ))}
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>

  );
};


const SingleMovie = ({ img, views, title, ago }) => {
  return (
    <div className="overflow-hidden rounded-xl h-[200px] md:h-[200px] w-full mb-5">
      <div className="w-full h-full relative" style={{ backgroundImage: img, backgroundSize: 'cover', backgroundPosition: 'center -19px' }}>
        <div className="absolute top-0 right-0 flex gap-2 items-center pt-1 pr-3 text-white/80">
          <AiOutlineEye className="w-5 h-5" />
          <span className="text-sm">{views}</span>
        </div>
        <div className="absolute bottom-0 left-0 backdrop-blur bg-white/20 w-full p-2 flex gap-3 rounded-xl">
          <AiFillPlayCircle className="w-10 h-10 text-white/70" />
          <div>
            <h2 className="font-normal text-[15px] truncate overflow-hidden lg:max-w-[220px]">{title}</h2>
            <p className="font-light text-[11px] text-white/50">{ago}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchMovie = ({ img, views, title }) => {
  return (
    <div className="rounded-xl overflow-hidden w-full flex">
      <div className="h-[80px] w-[80px] rounded-xl" style={{ backgroundImage: img, backgroundSize: 'cover', backgroundPosition: 'center -19px' }}></div>
      <div className="w-full pl-4 pr-2 flex gap-3 rounded-r-xl justify-between">
        <div>
          <h2 className="font-normal text-[18px] truncate overflow-hidden w-[250px] lg:max-w-[300px] mb-1">{title}</h2>
          <div className="flex gap-2 items-center pt-1 pr-3 text-white/80">
            <AiOutlineEye className="w-5 h-5" />
            <span className="text-sm">{views}</span>
          </div>
        </div>
        <AiFillPlayCircle className="w-10 h-10 text-white/70" />
      </div>
    </div>
  );
};

export default HomePage;
