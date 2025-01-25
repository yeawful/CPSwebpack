// ==================== UTILITY FUNCTIONS ====================

/**
 * Переключает состояние секции (раскрытие/скрытие)
 * @param {HTMLElement} section - Секция, которую нужно раскрыть/скрыть
 * @param {HTMLElement} button - Кнопка, которая управляет состоянием секции
 * @param {HTMLElement} buttonText - Элемент, содержащий текст кнопки
 * @param {string} expandedClass - Класс, который добавляется/удаляется при раскрытии
 * @param {string} showText - Текст кнопки в состоянии "показать"
 * @param {string} hideText - Текст кнопки в состоянии "скрыть"
 */
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

/**
 * Закрывает элемент при клике вне его области
 * @param {HTMLElement} element - Элемент, который нужно закрыть
 * @param {NodeList} buttons - Кнопки, которые не должны закрывать элемент
 * @param {Function} closeFunction - Функция, которая выполняет закрытие
 */
function closeOnClickOutside(element, buttons, closeFunction) {
  document.addEventListener('click', function (event) {
    const buttonsArray = Array.from(buttons)
    if (
      !element.contains(event.target) &&
      !buttonsArray.some((button) => button.contains(event.target))
    ) {
      closeFunction()
    }
  })
}

/**
 * Настраивает модальное окно
 * @param {HTMLElement} modal - Модальное окно
 * @param {NodeList} buttons - Кнопки, открывающие модальное окно
 * @param {HTMLElement} closeButton - Кнопка закрытия модального окна
 */
function setupModal(modal, buttons, closeButton) {
  if (!modal || buttons.length === 0 || !closeButton) return

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      modal.classList.add('modal--shown')
      overlay.classList.add('overlay--visible')
      pageContainer.classList.add('blur-background')

      const firstFocusableElement = modal.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (firstFocusableElement) firstFocusableElement.focus()

      if (menu.classList.contains('menu--shown')) {
        menu.classList.remove('menu--shown')
      }
    })
  })

  closeButton.addEventListener('click', () => {
    modal.classList.remove('modal--shown')
    overlay.classList.remove('overlay--visible')
    pageContainer.classList.remove('blur-background')
    buttons[0].focus()
  })

  overlay.addEventListener('click', () => {
    modal.classList.remove('modal--shown')
    overlay.classList.remove('overlay--visible')
    pageContainer.classList.remove('blur-background')
    buttons[0].focus()
  })
}

/**
 * Ловушка фокуса для модальных окон
 * @param {HTMLElement} modal - Модальное окно
 */
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]

  modal.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus()
          event.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus()
          event.preventDefault()
        }
      }
    }
  })
}

// ==================== DOM ELEMENTS ====================

const aboutText = document.querySelector('.about__text')
const readMoreButton = document.querySelector('.about__read-more')
const readMoreButtonText = document.querySelector(
  '.about__read-more-description'
)
const hiddenParagraph = document.querySelector('.about__paragraph--hidden')

const list = document.querySelector('.brands__list')
const expandButton = document.querySelector('.brands__expand-btn')
const expandButtonText = document.querySelector('.brands__expand-text')

const sectionList = document.querySelector('.devices__list')
const sectionExpandButton = document.querySelector('.devices__expand-btn')
const sectionExpandButtonText = document.querySelector('.devices__expand-text')

const burgerMenuButton = document.querySelector('.nav__burger')
const menu = document.querySelector('.menu')
const closeMenuButton = document.querySelector('.menu__btn--close')
const overlay = document.querySelector('.overlay')
const pageContainer = document.querySelector('.page-container')

const callModal = document.querySelector('.modal.call')
const callModalButtons = document.querySelectorAll('.btn--call')
const closeCallModalButton = callModal?.querySelector('.modal__btn')

const feedbackModal = document.querySelector('.modal.feedback')
const feedbackModalButtons = document.querySelectorAll('.btn--chat')
const closeFeedbackModalButton = feedbackModal?.querySelector('.modal__btn')

// ==================== EVENT LISTENERS ====================

// Управление текстом "Читать далее"
if (aboutText && readMoreButton && readMoreButtonText && hiddenParagraph) {
  readMoreButton.addEventListener('click', () => {
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
if (list && expandButton && expandButtonText) {
  expandButton.addEventListener('click', () => {
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
if (sectionList && sectionExpandButton && sectionExpandButtonText) {
  sectionExpandButton.addEventListener('click', () => {
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
if (burgerMenuButton && menu && closeMenuButton && overlay && pageContainer) {
  burgerMenuButton.addEventListener('click', () => {
    menu.classList.add('menu--shown')
    overlay.classList.add('overlay--visible')
    pageContainer.classList.add('blur-background')

    const firstFocusableElement = menu.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (firstFocusableElement) firstFocusableElement.focus()
  })

  closeMenuButton.addEventListener('click', () => {
    menu.classList.remove('menu--shown')
    overlay.classList.remove('overlay--visible')
    pageContainer.classList.remove('blur-background')
    burgerMenuButton.focus()
  })

  overlay.addEventListener('click', () => {
    menu.classList.remove('menu--shown')
    overlay.classList.remove('overlay--visible')
    pageContainer.classList.remove('blur-background')
    burgerMenuButton.focus()
  })
}

// Управление модальными окнами
setupModal(callModal, callModalButtons, closeCallModalButton)
setupModal(feedbackModal, feedbackModalButtons, closeFeedbackModalButton)

// Закрытие модальных окон и меню по нажатию на Esc
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const openModal = document.querySelector('.modal--shown')
    if (openModal) {
      openModal.classList.remove('modal--shown')
      overlay.classList.remove('overlay--visible')
      pageContainer.classList.remove('blur-background')

      const modalButtons = openModal.classList.contains('call')
        ? callModalButtons
        : feedbackModalButtons
      if (modalButtons.length > 0) modalButtons[0].focus()
    }

    if (menu.classList.contains('menu--shown')) {
      menu.classList.remove('menu--shown')
      overlay.classList.remove('overlay--visible')
      pageContainer.classList.remove('blur-background')
      burgerMenuButton.focus()
    }
  }
})

// Применяем ловушку фокуса для всех модальных окон
if (callModal) trapFocus(callModal)
if (feedbackModal) trapFocus(feedbackModal)
