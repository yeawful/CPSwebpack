/* eslint-disable indent */
// Создание медиа-запроса для проверки ширины экрана (максимум 767px)
const mediaQuery = window.matchMedia('(max-width: 767px)')

// Объект для хранения экземпляров Swiper
const swiperInstances = {}

// Функция для инициализации Swiper
function initSwiper(blockClass) {
  // Проверка, если ширина экрана меньше или равна 767px и Swiper еще не инициализирован
  if (mediaQuery.matches && !swiperInstances[blockClass]) {
    // Поиск контейнера, обертки, слайдов и пагинации
    const swiperContainer = document.querySelector(`.${blockClass}__content`) // Ищем контейнер для Swiper
    const swiperWrapper = document.querySelector(`.${blockClass}__list`) // Ищем обертку для слайдов
    const swiperSlides = document.querySelectorAll(`.${blockClass}__item`) // Ищем все слайды внутри обертки
    const swiperPagination = document.querySelector(
      `.${blockClass} .swiper-pagination`
    ) // Ищем элемент пагинации

    // Проверка, что все необходимые элементы существуют
    if (swiperContainer && swiperWrapper && swiperSlides.length > 0) {
      // Добавление классов Swiper к элементам
      swiperContainer.classList.add('swiper')
      swiperWrapper.classList.add('swiper-wrapper')
      swiperSlides.forEach((slide) => slide.classList.add('swiper-slide'))

      // Инициализация Swiper
      // eslint-disable-next-line no-undef
      swiperInstances[blockClass] = new Swiper(`.${blockClass}__content`, {
        // Настройка пагинации, если она существует
        pagination: swiperPagination
          ? {
              el: swiperPagination, // Указываем элемент для пагинации
              type: 'bullets', // Тип пагинации — точки
              clickable: true // Делаем точки кликабельными

              /* renderBullet: function (index, className) {
                if (index < 9) {
                  return `<span class="${className}"></span>`
                }
                return ''
              } */
            }
          : false,
        simulateTouch: true, // Включение симуляции касания
        grabCursor: true, // Изменение курсора при наведении
        slideToClickedSlide: true, // Переход к слайду по клику
        spaceBetween: 16, // Расстояние между слайдами
        slidesOffsetAfter: 32, // Отступ после последнего слайда
        slidesPerView: 1.2, // Количество слайдов, видимых одновременно
        breakpoints: {
          // Настройка количества слайдов в зависимости от ширины экрана
          320: { slidesPerView: 1.2 },
          480: { slidesPerView: 1.6 },
          560: { slidesPerView: 1.8 },
          640: { slidesPerView: 2.0 },
          720: { slidesPerView: 2.2 }
        }
      })

      // Скрытие пагинации, если ширина экрана больше 767px
      if (swiperPagination) {
        swiperPagination.style.display = mediaQuery.matches ? 'block' : 'none'
      }
    }
  } else if (!mediaQuery.matches && swiperInstances[blockClass]) {
    // Уничтожение Swiper, если ширина экрана больше или равна 768px
    swiperInstances[blockClass].destroy(true, true) // Уничтожаем Swiper, освобождая ресурсы
    swiperInstances[blockClass] = null // Сбрасываем переменную swiperInstance

    // Удаление классов Swiper с элементов
    const swiperContainer = document.querySelector(`.${blockClass}__content`)
    const swiperWrapper = document.querySelector(`.${blockClass}__list`)
    const swiperSlides = document.querySelectorAll(`.${blockClass}__item`)

    // Проверяем, что элементы существуют
    if (swiperContainer && swiperWrapper && swiperSlides.length > 0) {
      swiperContainer.classList.remove('swiper')
      swiperWrapper.classList.remove('swiper-wrapper')
      swiperSlides.forEach((slide) => slide.classList.remove('swiper-slide'))
    }

    // Скрытие пагинации, если ширина экрана больше 767px
    const swiperPagination = document.querySelector(
      `.${blockClass} .swiper-pagination`
    )
    if (swiperPagination) {
      swiperPagination.style.display = 'none'
    }
  }
}

// Инициализация Swiper для всех блоков при загрузке страницы
initSwiper('brands-repair')
initSwiper('devices-repair')
initSwiper('prices') // Добавляем инициализацию для prices-container

// Добавление обработчика изменения размера окна для переинициализации Swiper
mediaQuery.addEventListener('change', () => {
  initSwiper('brands-repair')
  initSwiper('devices-repair')
  initSwiper('prices') // Добавляем переинициализацию для prices-container
})
