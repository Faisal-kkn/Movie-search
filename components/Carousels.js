import { Chela_One } from 'next/font/google'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { AiFillPlayCircle } from 'react-icons/ai';

const ChelaOneFont = Chela_One({
    weight: '400',
    subsets: ['latin']
})

const Carousels = ({ slides }) => {
    return (
        <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={2}
            infiniteLoop={true}
            showStatus={false}
            showIndicators={false}
        >
            {
                Array.isArray(slides) && slides?.map(item => {
                    return (
                        <Slide key={item?.original_title} image={item.backdrop_path} title={item?.original_title} />
                    )
                }).slice(15, 20)
            }
        </Carousel>

    );
};

const Slide = ({ image, title }) => {
    return (
        <div className='h-[250px] rounded-xl overflow-hidden relative border border-gray-700/30'>
            <img src={`https://image.tmdb.org/t/p/original${image && image}`} />
            <button className='absolute bottom-[20px] text-white/80 left-[20px] flex bg-orange-500/75 rounded-xl p-3 px-4 items-center gap-2'>
                <AiFillPlayCircle className='w-8 h-8 text-white/50' />
                <span className='font-thin'>Watch Now</span>
            </button>
            <h2 className={`absolute top-[38%] right-11 text-white uppercase ${ChelaOneFont.className}`} style={{ fontSize: '40px', textShadow: '3px 4px black' }}>{title}</h2>
        </div>
    );
};

export default Carousels;
