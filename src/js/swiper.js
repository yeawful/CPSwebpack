/* eslint-disable indent */
const mediaQuery = window.matchMedia('(max-width: 767px)')
const swiperInstances = {}

function initSwiper(blockClass) {
  if (mediaQuery.matches && !swiperInstances[blockClass]) {
    const swiperContainer = document.querySelector(`.${blockClass}__content`)
    const swiperWrapper = document.querySelector(`.${blockClass}__list`)
    const swiperSlides = document.querySelectorAll(`.${blockClass}__item`)
    const swiperPagination = document.querySelector(
      `.${blockClass} .swiper-pagination`
    )

    if (!swiperContainer || !swiperWrapper || swiperSlides.length === 0) {
      return
    }

    swiperContainer.classList.add('swiper')
    swiperWrapper.classList.add('swiper-wrapper')
    swiperSlides.forEach((slide) => {
      slide.classList.add('swiper-slide')
      slide.setAttribute('tabindex', '0') // Добавляем tabindex к каждому слайду
    })

    // Добавляем ARIA-атрибуты
    swiperContainer.setAttribute('role', 'region')
    swiperContainer.setAttribute('aria-label', 'Слайдер')
    swiperWrapper.setAttribute('role', 'list')
    swiperSlides.forEach((slide, index) => {
      slide.setAttribute('role', 'listitem')
      slide.setAttribute('aria-label', `Слайд ${index + 1}`)
    })

    // eslint-disable-next-line no-undef
    swiperInstances[blockClass] = new Swiper(`.${blockClass}__content`, {
      pagination: swiperPagination
        ? {
            el: swiperPagination,
            type: 'bullets',
            clickable: true
          }
        : false,
      simulateTouch: true,
      grabCursor: true,
      slideToClickedSlide: true,
      spaceBetween: 16,
      slidesOffsetAfter: 32,
      slidesPerView: 1.2,
      breakpoints: {
        320: { slidesPerView: 1.2 },
        480: { slidesPerView: 1.6 },
        560: { slidesPerView: 1.8 },
        640: { slidesPerView: 2.0 },
        720: { slidesPerView: 2.2 }
      },
      on: {
        slideChange: function () {
          const activeSlide = this.slides[this.activeIndex]
          if (activeSlide) {
            activeSlide.focus() // Перемещаем фокус на активный слайд
          }
        }
      }
    })

    if (swiperPagination) {
      swiperPagination.style.display = mediaQuery.matches ? 'block' : 'none'
      const paginationBullets = swiperPagination.querySelectorAll(
        '.swiper-pagination-bullet'
      )
      paginationBullets.forEach((bullet) => {
        bullet.setAttribute('tabindex', '0') // Делаем элементы пагинации фокусируемыми
      })
    }
  } else if (!mediaQuery.matches && swiperInstances[blockClass]) {
    if (swiperInstances[blockClass] && swiperInstances[blockClass].destroy) {
      swiperInstances[blockClass].destroy(true, true)
    }
    swiperInstances[blockClass] = null

    const swiperContainer = document.querySelector(`.${blockClass}__content`)
    const swiperWrapper = document.querySelector(`.${blockClass}__list`)
    const swiperSlides = document.querySelectorAll(`.${blockClass}__item`)

    if (swiperContainer) swiperContainer.classList.remove('swiper')
    if (swiperWrapper) swiperWrapper.classList.remove('swiper-wrapper')
    swiperSlides.forEach((slide) => slide.classList.remove('swiper-slide'))

    const swiperPagination = document.querySelector(
      `.${blockClass} .swiper-pagination`
    )
    if (swiperPagination) {
      swiperPagination.style.display = 'none'
    }
  }
}

const blocks = ['brands', 'devices', 'prices']
blocks.forEach((block) => {
  initSwiper(block)
})

mediaQuery.addEventListener('change', () => {
  blocks.forEach((block) => {
    initSwiper(block)
  })
})
