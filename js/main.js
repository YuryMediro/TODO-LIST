// Переключение темы
// Выбираем кнопку
const btn = document.querySelector('.btn-theme')
// Отслеживаем щелчок по кнопке
btn.addEventListener('click', function () {
	// Затем переключаем (добавляем/удаляем) класс .dark-theme для body
	document.body.classList.toggle('dark-theme')
})

//Открытие и закрытие POP-UP окна
const openPopUp = document.getElementById('open_pop_up')
const cosePopUp = document.getElementById('pop_up_close')
const popUp = document.getElementById('pop_up')

openPopUp.addEventListener('click', function (e) {
	e.preventDefault()
	popUp.classList.add('active')
})

cosePopUp.addEventListener('click', () => {
	popUp.classList.remove('active')
})

// todo list
// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.btn-apply')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

// Function
function addTodo(event) {
	//Prevent form from submitting
	event.preventDefault()
	//Todo DIV
	const todoDiv = document.createElement('div')
	todoDiv.classList.add('todo')
	//Check mark button
	const completeButton = document.createElement('button')
	completeButton.innerHTML = '<i class=" fa-check"></i>'
	completeButton.classList.add('complete-btn')
	todoDiv.appendChild(completeButton)
	//Create li
	const newTodo = document.createElement('li')
	newTodo.innerText = todoInput.value
	newTodo.classList.add('todo-item')
	todoDiv.appendChild(newTodo)
	//ADD TODO TO LOCALSTORAGE
	saveLocalTodos(todoInput.value)
	//Check edit button
	const editButton = document.createElement('button')
	editButton.innerHTML = '<i class=" fa-edit"></i>'
	editButton.classList.add('edit-btn')
	todoDiv.appendChild(editButton)
	//Check trash button
	const trashButton = document.createElement('button')
	trashButton.innerHTML = '<i class="fa-trash"></i>'
	trashButton.classList.add('trash-btn')
	todoDiv.appendChild(trashButton)
	//APPEND TO LIST
	todoList.appendChild(todoDiv)
	//CLEAR TODO INPU VALUE
	todoInput.value = ''
}

function deleteCheck(e) {
	const item = e.target
	//DELETE TODO
	if (item.classList[0] === 'trash-btn') {
		const todo = item.parentElement
		removeLocalTodos(todo)
		todo.remove()
	}

	//CHECK MARK
	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement
		todo.classList.toggle('completed')
	}
}

//ВЫПАДАЮЩИЙ СПИСОК
function filterTodo(e) {
	const todos = todoList.childNodes
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case 'all':
				todo.style.display = 'flex'
				break
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex'
				} else {
					todo.style.display = 'none'
				}
				break
			case 'incompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex'
				} else {
					todo.style.display = 'none'
				}
				break
		}
	})
}

function saveLocalTodos(todo) {
	let todos
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	todos.push(todo)
	localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
	let todos
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	todos.forEach(function (todo) {
		//Todo DIV
		const todoDiv = document.createElement('div')
		todoDiv.classList.add('todo')
		//Check mark button
		const completeButton = document.createElement('button')
		completeButton.innerHTML = '<i class=" fa-check"></i>'
		completeButton.classList.add('complete-btn')
		todoDiv.appendChild(completeButton)
		//Create li
		const newTodo = document.createElement('li')
		newTodo.innerText = todo
		newTodo.classList.add('todo-item')
		todoDiv.appendChild(newTodo)
		//Check edit button
		const editButton = document.createElement('button')
		editButton.innerHTML = '<i class=" fa-edit"></i>'
		editButton.classList.add('edit-btn')
		todoDiv.appendChild(editButton)
		//Check trash button
		const trashButton = document.createElement('button')
		trashButton.innerHTML = '<i class="fa-trash"></i>'
		trashButton.classList.add('trash-btn')
		todoDiv.appendChild(trashButton)
		//APPEND TO LIST
		todoList.appendChild(todoDiv)
	})
}

function removeLocalTodos(todo) {
	let todos
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	const todoIndex = todo.children[1].innerText
	todos.splice(todos.indexOf(todoIndex), 1)
	localStorage.setItem('todos', JSON.stringify(todos))
}
