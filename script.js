const input = document.querySelector('.app__input')
const uncompleted = document.querySelector('.uncompleted__list')
const completed = document.querySelector('.completed__list')
const counter = document.querySelector('.completed__title')

const load = function () {
  return JSON.parse(localStorage.getItem('todoList'))
}

const save = function () {
  localStorage.setItem('todoList', JSON.stringify(todoList))
}

let todoList = load() ?? []
console.log(todoList)

const generateMarkup = function (todo) {
  return `
            <li class="list__item item item${
              todo.completed ? '-completed' : ''
            }" data-id=${todo.id}>
            <span> <input type="checkbox" class="item__checkbox" ${
              todo.completed ? 'checked' : ''
            }/>${todo.text}</span> 
            <a href="#" class="delete"> 
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
            </svg> </a>
            </li>
`
}

const render = function () {
  const uncompletedTodos = todoList.filter((todo) => todo.completed === false)
  const completedTodos = todoList.filter((todo) => todo.completed === true)

  counter.textContent = todoList.length
    ? `Completed ${completedTodos.length} / ${todoList.length}`
    : ''
  const uncompletedMarkup = uncompletedTodos
    .map((todo) => {
      return generateMarkup(todo)
    })
    .join('')

  uncompleted.innerHTML = ''
  uncompleted.insertAdjacentHTML('beforeend', uncompletedMarkup)
  const completedMarkup = completedTodos
    .map((todo) => {
      return generateMarkup(todo)
    })
    .join('')

  completed.innerHTML = ''
  completed.insertAdjacentHTML('beforeend', completedMarkup)
}

const toggleTodo = function (e, isCompleted) {
  if (e.target.classList.contains('item__checkbox')) {
    const id = e.target.closest('.list__item').dataset.id
    todoList = todoList.map((todo) => {
      if (todo.id === id) todo.completed = isCompleted
      return todo
    })
    save()
    render()
  }
}

const deleteTodo = function (e) {
  if (e.target.classList.contains('delete')) {
    const id = e.target.closest('.list__item').dataset.id
    todoList = todoList.filter((todo) => todo.id !== id)

    save()
    render()
  }
}

window.addEventListener('load', () => {
  render()
})

input.addEventListener('keyup', function (e) {
  if (e.code === 'Enter' && input.value) {
    const todo = {
      id: Date.now() + '',
      text: input.value,
      completed: false,
    }
    todoList.push(todo)
    input.value = ''
    render()
  }
})

uncompleted.addEventListener('click', function (e) {
  toggleTodo(e, true)
  deleteTodo(e)
})

completed.addEventListener('click', function (e) {
  toggleTodo(e, false)
  deleteTodo(e)
})
