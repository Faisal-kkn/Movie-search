import { useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { AiFillPlayCircle, AiOutlineEye } from 'react-icons/ai';

import Header from '../components/Header';

const navItems = [
  { href: '/', label: 'Movies' },
  { href: '/popular', label: 'TV Show' },
  { href: '/top-rated', label: 'Animation' },
  { href: '/upcoming', label: 'Plans' },
];


const HomePage = () => {

  const [upComingMovies, setUpComingMovies] = useState([
    {
      img: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/c38994103185201.5f476d193a92b.jpg',
      views: '2.3M',
      title: 'Minnal murali',
      ago: '2.3hr',
    },
    {
      img: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/c38994103185201.5f476d193a92b.jpg',
      views: '2.3M',
      title: 'Minnal murali',
      ago: '2.3hr',
    },
    {
      img: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/c38994103185201.5f476d193a92b.jpg',
      views: '2.3M',
      title: 'Minnal murali',
      ago: '2.3hr',
    },
    {
      img: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/c38994103185201.5f476d193a92b.jpg',
      views: '2.3M',
      title: 'Minnal murali',
      ago: '2.3hr',
    },
  ]);

 
  return (
    <div>
      <Header logoText="MOVEA" navItems={navItems} />
      <div className="max-w-screen-xl flex flex-wrap justify-between mx-auto p-4 pt-0 gap-3 border-gray-700 border-0 md:border-t">
        <div className=" hidden md:block border-0 md:border-1 border-white text-white p-4 w-full md:w-1/3 lg:w-1/4">
          <div className="flex items-center justify-between border-gray-700 mb-5">
            <h1 className="text-2xl font-medium">New Trailers</h1>
            <h1 className="text-xs font-medium flex items-center">
              <span className="text-gray-400 mr-2 font-normal">Sort By</span>
              Today <FaSort className="w-3 h-3" />
            </h1>
          </div>
          <SingleMovie
            img={`url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/c38994103185201.5f476d193a92b.jpg')`}
            views={'3M'}
            title={'Minnal murali'}
            ago={'20-10-2021'}
          />
        </div>
        <div className="border-r border-gray-700 min-h-screen w-[1px] hidden md:block" />
        <div className="border-1 border-white text-white flex-1 py-4">
          <>
            <div className="flex items-center justify-between mt-8">
              <h1 className="text-2xl font-medium">Upcoming Movies</h1>
              <h1 className="text-base font-medium flex items-center text-gray-400">
                All movies <MdKeyboardArrowRight className="w-5 h-5" />
              </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
              {Array.isArray(upComingMovies) &&
                upComingMovies.map((movie) => (
                  <SingleMovie
                    img={`url(${movie.img})`}
                    views={movie.views + 'M'}
                    title={movie.title}
                    ago={movie.ago}
                    key={movie.title}
                  />
                ))}
            </div>
          </>
        </div>
      </div>
    </div>

  );
};


const SingleMovie = ({ img, views, title, ago }) => {
  return (
    <div className="overflow-hidden rounded-xl h-[200px] w-full mb-5">
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

const SearchMovie = ({ img, views, title, ago }) => {
  return (
    <div className="rounded-xl overflow-hidden w-full flex">
      <div className="h-[80px] w-[80px] rounded-xl" style={{ backgroundImage: img, backgroundSize: 'cover', backgroundPosition: 'center -19px' }}>
      </div>
      <div className="w-full pl-4 pr-2 flex gap-3 rounded-r-xl justify-between">
        <div>
          <h2 className="font-normal text-[18px] truncate overflow-hidden lg:max-w-[750px] mb-1">{title}</h2>
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
