const aboutText = document.querySelector('.about__text')
const readMoreButton = document.querySelector('.about__read-more')
const readMoreButtonText = document.querySelector(
  '.about__read-more-description'
)
const hiddenParagraph = document.querySelector('.about__paragraph--hidden')

if (aboutText && readMoreButton && readMoreButtonText && hiddenParagraph) {
  readMoreButton.addEventListener('click', function () {
    aboutText.classList.toggle('about__text--expanded')
    hiddenParagraph.classList.toggle('about__paragraph--hidden')

    if (aboutText.classList.contains('about__text--expanded')) {
      readMoreButtonText.textContent = 'Скрыть'
    } else {
      readMoreButtonText.textContent = 'Читать далее'
    }
  })
}

// Поиск списка, кнопки раскрытия/скрытия и текста кнопки
const list = document.querySelector('.brands-repair__list')
const expandButton = document.querySelector('.brands-repair__expand-button')
const expandButtonText = document.querySelector(
  '.brands-repair__expand-description'
)

// Проверка, что все элементы существуют
if (list && expandButton && expandButtonText) {
  // Добавление обработчика клика на кнопку
  expandButton.addEventListener('click', function () {
    // Переключение класса для раскрытия/скрытия списка
    list.classList.toggle('brands-repair__list--expanded')
    // Переключение класса для поворота кнопки
    expandButton.classList.toggle('brands-repair__expand-button--rotated')
    // Изменение текста кнопки в зависимости от состояния списка
    expandButtonText.textContent = list.classList.contains(
      'brands-repair__list--expanded'
    )
      ? 'Скрыть'
      : 'Показать все'
  })
}

// Поиск списка, кнопки раскрытия/скрытия и текста кнопки для section
const sectionList = document.querySelector('.devices-repair__list')
const sectionExpandButton = document.querySelector(
  '.devices-repair__expand-button'
)
const sectionExpandButtonText = document.querySelector(
  '.devices-repair__expand-description'
)

// Проверка, что все элементы существуют
if (sectionList && sectionExpandButton && sectionExpandButtonText) {
  // Добавление обработчика клика на кнопку
  sectionExpandButton.addEventListener('click', function () {
    // Переключение класса для раскрытия/скрытия списка
    sectionList.classList.toggle('devices-repair__list--expanded')
    // Переключение класса для поворота кнопки
    sectionExpandButton.classList.toggle(
      'devices-repair__expand-button--rotated'
    )
    // Изменение текста кнопки в зависимости от состояния списка
    sectionExpandButtonText.textContent = sectionList.classList.contains(
      'devices-repair__list--expanded'
    )
      ? 'Скрыть'
      : 'Показать все'
  })
}

// Поиск элементов
const burgerMenuButton = document.querySelector('.burger-menu')
const menu = document.querySelector('.menu')
const closeMenuButton = document.querySelector('.menu__btn1')

// Проверка, что все элементы существуют
if (burgerMenuButton && menu && closeMenuButton) {
  // Добавление обработчика клика на кнопку "бургер"
  burgerMenuButton.addEventListener('click', function () {
    menu.classList.add('menu--visible') // Показываем меню
  })

  // Добавление обработчика клика на кнопку закрытия меню
  closeMenuButton.addEventListener('click', function () {
    menu.classList.remove('menu--visible') // Скрываем меню
  })

  // Закрытие меню при клике вне его области
  document.addEventListener('click', function (event) {
    if (
      !menu.contains(event.target) &&
      !burgerMenuButton.contains(event.target)
    ) {
      menu.classList.remove('menu--visible')
    }
  })
}
