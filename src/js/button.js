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
