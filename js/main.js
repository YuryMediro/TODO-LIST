// Выпадающий список
var x, i, j, l, ll, selElmnt, a, b, c
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName('filter-todo')
l = x.length
for (i = 0; i < l; i++) {
	selElmnt = x[i].getElementsByTagName('select')[0]
	ll = selElmnt.length
	/* For each element, create a new DIV that will act as the selected item: */
	a = document.createElement('DIV')
	a.setAttribute('class', 'select-selected')
	a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML
	x[i].appendChild(a)
	/* For each element, create a new DIV that will contain the option list: */
	b = document.createElement('DIV')
	b.setAttribute('class', 'select-items select-hide')
	for (j = 1; j < ll; j++) {
		/* For each option in the original select element,
    create a new DIV that will act as an option item: */
		c = document.createElement('DIV')
		c.innerHTML = selElmnt.options[j].innerHTML
		c.addEventListener('click', function (e) {
			/* When an item is clicked, update the original select box,
        and the selected item: */
			var y, i, k, s, h, sl, yl
			s = this.parentNode.parentNode.getElementsByTagName('select')[0]
			sl = s.length
			h = this.parentNode.previousSibling
			for (i = 0; i < sl; i++) {
				if (s.options[i].innerHTML == this.innerHTML) {
					s.selectedIndex = i
					h.innerHTML = this.innerHTML
					y = this.parentNode.getElementsByClassName('same-as-selected')
					yl = y.length
					for (k = 0; k < yl; k++) {
						y[k].removeAttribute('class')
					}
					this.setAttribute('class', 'same-as-selected')
					break
				}
			}
			h.click()
		})
		b.appendChild(c)
	}
	x[i].appendChild(b)
	a.addEventListener('click', function (e) {
		/* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
		e.stopPropagation()
		closeAllSelect(this)
		this.nextSibling.classList.toggle('select-hide')
		this.classList.toggle('select-arrow-active')
	})
}

function closeAllSelect(elmnt) {
	/* A function that will close all select boxes in the document,
  except the current select box: */
	var x,
		y,
		i,
		xl,
		yl,
		arrNo = []
	x = document.getElementsByClassName('select-items')
	y = document.getElementsByClassName('select-selected')
	xl = x.length
	yl = y.length
	for (i = 0; i < yl; i++) {
		if (elmnt == y[i]) {
			arrNo.push(i)
		} else {
			y[i].classList.remove('select-arrow-active')
		}
	}
	for (i = 0; i < xl; i++) {
		if (arrNo.indexOf(i)) {
			x[i].classList.add('select-hide')
		}
	}
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener('click', closeAllSelect)

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
// const todoInput = document.querySelector('todo-input')
// const todoList = document.querySelector('todo-list')
// const filterOption = document.querySelector('filter-todo')
// const todoButton = document.querySelector('btn-apply')

// document.addEventListener('DOMContentLoaded', getLocalTodos)
// todoButton.addEventListener('click', addTodo)
// todoList.addEventListener('click', deleteCheck)
// filterOption.addEventListener('change', filterTodo)

// function addTodo(event) {
// 	event.preventDefault()
// 	const todoDiv = document.createElement('div')
// 	todoDiv.classList.add('todo')
// 	const newTodo = document.createElement('li')
// 	newTodo.innerText = todoInput.value
// 	newTodo.classList.add('todo-item')
// 	todoDiv.appendChild(newTodo)
// 	// ADDING TO LOCAL STORAGE
// 	saveLocalTodos(todoInput.value)

// 	const completedButton = document.createElement('button')
// 	completedButton.innerHTML = '<li class="apply"></li>'
// 	completedButton.classList.add('complete-btn')
// 	todoDiv.appendChild(completedButton)

// 	const trashButton = document.createElement('button')
// 	trashButton.innerHTML = '<li class="apply"></li>'
// 	trashButton.classList.add('trash-btn')
// 	todoDiv.appendChild(trashButton)

// 	todoList.appendChild(todoDiv)
// 	todoInput.value = ''
// }

// function deleteCheck(e) {
// 	const item = e.target

// 	if (item.classList[0] === 'trash-btn') {
// 		const todo = item.parentElement
// 		todo.classList.add('slide')

// 		removeLocalTodos(todo)
// 		todo.addEventListener('transitionend', function () {
// 			todo.remove()
// 		})
// 	}
// 	if (item.classList[0] === 'complete-btn') {
// 		const todo = item.parentElement
// 		todo.classList.toggle('completed')
// 	}
// }

// function filterTodo(e) {
// 	const todos = todoList.childNodes
// 	todos.forEach(function (todo) {
// 		switch (e.target.value) {
// 			case 'all':
// 				todo.style.display = 'flex'
// 				break
// 			case 'completed':
// 				if (todo.classList.contains('completed')) {
// 					todo.style.display = 'flex'
// 				} else {
// 					todo.style.display = 'none'
// 				}
// 				break
// 			case 'incompleted':
// 				if (!todo.classList.contains('completed')) {
// 					todo.style.display = 'flex'
// 				} else {
// 					todo.style.display = 'none'
// 				}
// 				break
// 		}
// 	})
// }

// function saveLocalTodos(todo) {
// 	let todos
// 	if (localStorage.getItem('todos') === null) {
// 		todos = []
// 	} else {
// 		todos = JSON.parse(localStorage.getItem('todos'))
// 	}
// 	todos.push(todo)
// 	localStorage.setItem('todos', JSON.stringify(todos))
// }

// function getLocalTodos() {
// 	let todos
// 	if (localStorage.getItem('todos') === null) {
// 		todos = []
// 	} else {
// 		todos = JSON.parse(localStorage.getItem('todos'))
// 	}
// 	todos.forEach(function (todo) {
// 		const todoDiv = document.createElement('div')
// 		todoDiv.classList.add('todo')
// 		const newTodo = document.createElement('li')
// 		newTodo.innerText = todo
// 		newTodo.classList.add('todo-item')
// 		todoDiv.appendChild(newTodo)

// 		const trashButton = document.createElement('button')
// 		trashButton.innerHTML = "<li class='apply'>APPLY</li>"
// 		trashButton.classList.add('complete-btn')
// 		todoDiv.appendChild(trashButton)

// 		todoList.appendChild(todoDiv)
// 	})
// }

// function removeLocalTodos(todo) {
// 	let todos
// 	if (localStorage.getItem('todos') === null) {
// 		todos = []
// 	} else {
// 		todos = JSON.parse(localStorage.getItem('todos'))
// 	}

// 	const todoIndex = todo.children[0].innerText
// 	todos.splice(todos.indexOf(todoIndex), 1)
// 	localStorage.setItem('todos', JSON.stringify(todos))
// }
