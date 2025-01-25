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
// eslint-disable-next-line no-unused-vars
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
        overlay.classList.add('overlay--visible')
        pageContainer.classList.add('blur-background')

        // Перемещаем фокус на первый фокусируемый элемент модального окна
        const firstFocusableElement = modal.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (firstFocusableElement) {
          firstFocusableElement.focus()
        }

        // Закрываем меню, если оно открыто
        if (menu.classList.contains('menu--shown')) {
          menu.classList.remove('menu--shown')
        }
      })
    })

    closeButton.addEventListener('click', function () {
      modal.classList.remove('modal--shown')
      overlay.classList.remove('overlay--visible')
      pageContainer.classList.remove('blur-background')

      // Возвращаем фокус на кнопку, которая открыла модальное окно
      buttons[0].focus()
    })

    overlay.addEventListener('click', function () {
      modal.classList.remove('modal--shown')
      overlay.classList.remove('overlay--visible')
      pageContainer.classList.remove('blur-background')

      // Возвращаем фокус на кнопку, которая открыла модальное окно
      buttons[0].focus()
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
const list = document.querySelector('.brands__list')
const expandButton = document.querySelector('.brands__expand-btn')
const expandButtonText = document.querySelector('.brands__expand-text')

if (list && expandButton && expandButtonText) {
  expandButton.addEventListener('click', function () {
    toggleSection(
      list,
      expandButton,
      expandButtonText,
      'brands__list--expanded',
      'Показать все',
      'Скрыть'
    )
  })
}

// Управление списком устройств
const sectionList = document.querySelector('.devices__list')
const sectionExpandButton = document.querySelector('.devices__expand-btn')
const sectionExpandButtonText = document.querySelector('.devices__expand-text')

if (sectionList && sectionExpandButton && sectionExpandButtonText) {
  sectionExpandButton.addEventListener('click', function () {
    toggleSection(
      sectionList,
      sectionExpandButton,
      sectionExpandButtonText,
      'devices__list--expanded',
      'Показать все',
      'Скрыть'
    )
  })
}

// Управление бургер-меню
const burgerMenuButton = document.querySelector('.nav__burger')
const menu = document.querySelector('.menu')
const closeMenuButton = document.querySelector('.menu__btn--close')
const overlay = document.querySelector('.overlay')
const pageContainer = document.querySelector('.page-container')

if (burgerMenuButton && menu && closeMenuButton && overlay && pageContainer) {
  burgerMenuButton.addEventListener('click', function () {
    menu.classList.add('menu--shown')
    overlay.classList.add('overlay--visible')
    pageContainer.classList.add('blur-background')

    // Перемещаем фокус на первый элемент меню
    const firstFocusableElement = menu.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (firstFocusableElement) {
      firstFocusableElement.focus()
    }
  })

  closeMenuButton.addEventListener('click', function () {
    menu.classList.remove('menu--shown')
    overlay.classList.remove('overlay--visible')
    pageContainer.classList.remove('blur-background')

    // Возвращаем фокус на кнопку бургер-меню
    burgerMenuButton.focus()
  })

  overlay.addEventListener('click', function () {
    menu.classList.remove('menu--shown')
    overlay.classList.remove('overlay--visible')
    pageContainer.classList.remove('blur-background')

    // Возвращаем фокус на кнопку бургер-меню
    burgerMenuButton.focus()
  })
}

// Управление модальными окнами
const callModal = document.querySelector('.modal.call')
const callModalButtons = document.querySelectorAll('.btn--call')
const closeCallModalButton = callModal?.querySelector('.modal__btn')

const feedbackModal = document.querySelector('.modal.feedback')
const feedbackModalButtons = document.querySelectorAll('.btn--chat')
const closeFeedbackModalButton = feedbackModal?.querySelector('.modal__btn')

setupModal(callModal, callModalButtons, closeCallModalButton)
setupModal(feedbackModal, feedbackModalButtons, closeFeedbackModalButton)

// Закрытие модальных окон и меню по нажатию на Esc
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    // Закрываем модальные окна
    const openModal = document.querySelector('.modal--shown')
    if (openModal) {
      openModal.classList.remove('modal--shown')
      overlay.classList.remove('overlay--visible')
      pageContainer.classList.remove('blur-background')

      // Возвращаем фокус на кнопку, которая открыла модальное окно
      const modalButtons = openModal.classList.contains('call')
        ? callModalButtons
        : feedbackModalButtons
      if (modalButtons.length > 0) {
        modalButtons[0].focus()
      }
    }

    // Закрываем меню
    if (menu.classList.contains('menu--shown')) {
      menu.classList.remove('menu--shown')
      overlay.classList.remove('overlay--visible')
      pageContainer.classList.remove('blur-background')

      // Возвращаем фокус на кнопку бургер-меню
      burgerMenuButton.focus()
    }
  }
})

// Ловушка фокуса для модальных окон
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]

  modal.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus()
          event.preventDefault()
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus()
          event.preventDefault()
        }
      }
    }
  })
}

// Применяем ловушку фокуса для всех модальных окон
if (callModal) trapFocus(callModal)
if (feedbackModal) trapFocus(feedbackModal)
