// Функция для переключения состояния секции (раскрытие/скрытие)
function toggleSection(
  section,
  button,
  buttonText,
  expandedClass,
  showText,
  hideText
) {
  section.classList.toggle(expandedClass)
  buttonText.textContent = section.classList.contains(expandedClass)
    ? hideText
    : showText
}

// Функция для закрытия элемента при клике вне его области
function closeOnClickOutside(element, buttons, closeFunction) {
  document.addEventListener('click', function (event) {
    const buttonsArray = Array.from(buttons) // Преобразуем NodeList в массив
    if (
      !element.contains(event.target) &&
      !buttonsArray.some((button) => button.contains(event.target))
    ) {
      closeFunction()
    }
  })
}

// Функция для настройки модального окна
function setupModal(modal, buttons, closeButton) {
  if (modal && buttons.length > 0 && closeButton) {
    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        modal.classList.add('modal--shown')
      })
    })

    closeButton.addEventListener('click', function () {
      modal.classList.remove('modal--shown')
    })

    closeOnClickOutside(modal, buttons, function () {
      modal.classList.remove('modal--shown')
    })
  }
}

// Управление текстом "Читать далее"
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
    readMoreButtonText.textContent = aboutText.classList.contains(
      'about__text--expanded'
    )
      ? 'Скрыть'
      : 'Читать далее'
  })
}

// Управление списком брендов
const list = document.querySelector('.brands-repair__list')
const expandButton = document.querySelector('.brands-repair__expand-button')
const expandButtonText = document.querySelector(
  '.brands-repair__expand-description'
)

if (list && expandButton && expandButtonText) {
  expandButton.addEventListener('click', function () {
    toggleSection(
      list,
      expandButton,
      expandButtonText,
      'brands-repair__list--expanded',
      'Показать все',
      'Скрыть'
    )
  })
}

// Управление списком устройств
const sectionList = document.querySelector('.devices-repair__list')
const sectionExpandButton = document.querySelector(
  '.devices-repair__expand-button'
)
const sectionExpandButtonText = document.querySelector(
  '.devices-repair__expand-description'
)

if (sectionList && sectionExpandButton && sectionExpandButtonText) {
  sectionExpandButton.addEventListener('click', function () {
    toggleSection(
      sectionList,
      sectionExpandButton,
      sectionExpandButtonText,
      'devices-repair__list--expanded',
      'Показать все',
      'Скрыть'
    )
  })
}

// Управление бургер-меню
const burgerMenuButton = document.querySelector('.burger-menu')
const menu = document.querySelector('.menu')
const closeMenuButton = document.querySelector('.menu__btn1')

if (burgerMenuButton && menu && closeMenuButton) {
  burgerMenuButton.addEventListener('click', function () {
    menu.classList.add('menu--visible')
  })

  closeMenuButton.addEventListener('click', function () {
    menu.classList.remove('menu--visible')
  })

  closeOnClickOutside(menu, [burgerMenuButton], function () {
    menu.classList.remove('menu--visible')
  })
}

// Управление модальными окнами
const callModal = document.querySelector('.modal.call')
const callModalButtons = document.querySelectorAll('.menu__btn-call') // NodeList
const closeCallModalButton = callModal?.querySelector('.modal__icon')

const feedbackModal = document.querySelector('.modal.feedback')
const feedbackModalButtons = document.querySelectorAll('.menu__btn-chat') // NodeList
const closeFeedbackModalButton = feedbackModal?.querySelector('.modal__icon')

setupModal(callModal, callModalButtons, closeCallModalButton)
setupModal(feedbackModal, feedbackModalButtons, closeFeedbackModalButton)
