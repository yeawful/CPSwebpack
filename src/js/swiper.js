const mediaQuery = window.matchMedia('(max-width: 767px)')
let swiperInstances = {}

function initSwiper(
  selector,
  containerClass,
  wrapperClass,
  slideClass,
  paginationClass
) {
  if (mediaQuery.matches && !swiperInstances[selector]) {
    const swiperContainer = document.querySelector(containerClass)
    const swiperWrapper = document.querySelector(wrapperClass)
    const swiperSlides = document.querySelectorAll(slideClass)
    const swiperPagination = document.querySelector(paginationClass)

    if (swiperContainer && swiperWrapper && swiperSlides.length > 0) {
      swiperContainer.classList.add('swiper')
      swiperWrapper.classList.add('swiper-wrapper')
      swiperSlides.forEach((slide) => slide.classList.add('swiper-slide'))

      swiperInstances[selector] = new Swiper(containerClass, {
        pagination: swiperPagination
          ? {
              el: swiperPagination,
              type: 'bullets',
              clickable: true,
              renderBullet: function (index, className) {
                if (index < 9) {
                  return `<span class="${className}"></span>`
                }
                return ''
              }
            }
          : false,
        simulateTouch: true,
        grabCursor: true,
        slideToClickedSlide: true,
        spaceBetween: 16,
        slidesOffsetAfter: 32,
        slidesPerView: 1.2,
        breakpoints: {
          320: { slidesPerView: 1.3 },
          480: { slidesPerView: 1.6 },
          560: { slidesPerView: 1.8 },
          640: { slidesPerView: 2.0 },
          720: { slidesPerView: 2.2 }
        }
      })

      if (swiperPagination) {
        swiperPagination.style.display = mediaQuery.matches ? 'block' : 'none'
      }
    }
  } else if (!mediaQuery.matches && swiperInstances[selector]) {
    // Уничтожаем Swiper
    swiperInstances[selector].destroy(true, true)
    swiperInstances[selector] = null

    // Возвращаем элементы к исходному состоянию
    const swiperContainer = document.querySelector(containerClass)
    const swiperWrapper = document.querySelector(wrapperClass)
    const swiperSlides = document.querySelectorAll(slideClass)

    if (swiperContainer && swiperWrapper && swiperSlides.length > 0) {
      swiperContainer.classList.remove('swiper')
      swiperWrapper.classList.remove('swiper-wrapper')
      swiperSlides.forEach((slide) => {
        slide.classList.remove('swiper-slide')
        slide.style.width = '' // Сбрасываем ширину
        slide.style.flexShrink = '' // Сбрасываем flex-shrink
        slide.style.marginRight = '' // Сбрасываем margin-right
      })
    }

    // Скрываем пагинацию
    const swiperPagination = document.querySelector(paginationClass)
    if (swiperPagination) {
      swiperPagination.style.display = 'none'
    }
  }
}

function initSwipers() {
  initSwiper(
    'brands-repair',
    '.brands-repair__content',
    '.brands-repair__list',
    '.brands-repair__item',
    '.brands-repair .swiper-pagination'
  )

  initSwiper(
    'devices-repair',
    '.devices-repair .section__content',
    '.devices-repair .section__list',
    '.devices-repair .devices-repair__item',
    '.devices-repair .swiper-pagination'
  )
}

// Инициализация Swiper при загрузке страницы
initSwipers()

// Переинициализация Swiper при изменении размера окна
mediaQuery.addEventListener('change', initSwipers)
