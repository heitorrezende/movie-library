import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Carousel = ({ data, title, isMovie }) => {
  return (
    <div className="mb-16">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <Swiper
        modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={6}
        loop={false}
        autoplay={{ delay: 3000 }}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {data.results.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col cursor-pointer transform transition-transform duration-300 hover:scale-105">
              <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={isMovie ? item.title : item.name} className="w-full h-48 object-cover" />
              <div className="p-2 flex flex-col flex-grow">
                <h2 className="text-lg font-bold">{isMovie ? item.title : item.name}</h2>
                <p className="text-gray-600">{isMovie ? item.release_date : item.first_air_date}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;

