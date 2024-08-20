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
// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.btn-apply')
const todoList = document.querySelector('.todo-list')

// Event Listeners
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)

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
		todo.remove()
	}

	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement
		todo.classList.toggle('completed')
	}
}
