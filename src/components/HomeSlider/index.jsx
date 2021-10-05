import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';

// install Swiper modules

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import styles from './HomeSlider.module.scss';

SwiperCore.use([Pagination]);

function HomeSlider() {
  return (
    <Swiper
      modules={[Pagination]}
      className={styles.homeSlider}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      pagination={{
        clickable: true,
        modifierClass: 'homeSliderPagination ',
        bulletActiveClass: 'homeSliderBulletActive',
        bulletClass: 'homeSliderBullet',
      }}
      centeredSlides
    >
      <SwiperSlide className={styles.homeSlide}>
        <div className="container">
          <div className={styles.homeSlideInner}>
            <div className={styles.homeSlideText}>
              <h4 className={styles.homeSlideSubheader}>
                Best Furniture For Your Castle....
              </h4>
              <h1 className={styles.homeSlideHeader}>
                New Furniture Collection Trends in 2020
              </h1>
              <span className={styles.homeSlideDesc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                in est adipiscing in phasellus non in justo.
              </span>
              <button className={styles.homeSlideBtn} type="button">
                Shop Now
              </button>
            </div>
            <div className={styles.homeSlideImg}>
              <img src="img/item-img.png" alt="Sofa" />
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className={styles.homeSlide}>
        <div className="container">
          <div className={styles.homeSlideInner}>
            <div className={styles.homeSlideText}>
              <h4 className={styles.homeSlideSubheader}>
                Best Furniture For Your Castle....
              </h4>
              <h1 className={styles.homeSlideHeader}>
                New Furniture Collection Trends in 2020
              </h1>
              <span className={styles.homeSlideDesc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                in est adipiscing in phasellus non in justo.
              </span>
              <button className={styles.homeSlideBtn} type="button">
                Shop Now
              </button>
            </div>
            <div className="homeSlideImg">
              <img src="img/item-img.png" alt="Sofa" />
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className={styles.homeSlide}>
        <div className="container">
          <div className={styles.homeSlideInner}>
            <div className={styles.homeSlideText}>
              <h4 className={styles.homeSlideSubheader}>
                Best Furniture For Your Castle....
              </h4>
              <h1 className={styles.homeSlideHeader}>
                New Furniture Collection Trends in 2020
              </h1>
              <span className={styles.homeSlideDesc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                in est adipiscing in phasellus non in justo.
              </span>
              <button className={styles.homeSlideBtn} type="button">
                Shop Now
              </button>
            </div>
            <div className="homeSlideImg">
              <img src="img/item-img.png" alt="Sofa" />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export { HomeSlider };
