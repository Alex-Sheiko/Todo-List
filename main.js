import {
    createNode, findParent, calculateAllTask, refreshAllTaskCount, calculateCompletedTask, refreshCompletedTaskCount,
    saveDataToLocalStorage, getDataFromLocalStorage
} from './func.js';

const mainDiv = document.querySelector('#root');

let formToDo = createNode({
    tagName: 'form',
    classList: ['todo'],
})

let titleToDo = createNode({
    tagName: 'h1',
    classList: ['todo-title'],
    text: 'Todo List'
})

let innerToDo = createNode({
    tagName: 'div',
    classList: ['todo-inner'],
})

let navSectionToDoTop = createNode({
    tagName: 'div',
    classList: ['todo-nav-top'],
});

let navSectionToDoCenter = createNode({
    tagName: 'div',
    classList: ['todo-nav-center'],
});

let navSectionToDoBottom = createNode({
    tagName: 'div',
    classList: ['todo-nav-bottom'],
});

let buttonDeleteAll = createNode({
    tagName: 'button',
    classList: ['todo-nav__btn', 'todo-nav__delete-btn'],
    text: 'Delete All'
});

buttonDeleteAll.addEventListener('click', function (event) {
    event.preventDefault();

    let items = document.querySelectorAll('.todo-box');
    items.forEach((elem) => {
        elem.remove();
    });

    refreshAllTaskCount();
    refreshCompletedTaskCount()
    saveDataToLocalStorage();
});

let buttonDeleteLast = createNode({
    tagName: 'button',
    classList: ['todo-nav__btn', 'todo-nav__last-btn'],
    text: 'Delete Last'
});

buttonDeleteLast.addEventListener('click', function (event) {
    event.preventDefault();

    let parent = document.querySelector('.todo-nav-bottom');

    parent.lastChild.remove();
    refreshAllTaskCount();
    refreshCompletedTaskCount()
    saveDataToLocalStorage();
});

let taskMessage = createNode({
    tagName: 'input',
    classList: ['todo-nav-top__task'],
    placeholder: 'Enter Task'
});

let buttonAdd = createNode({
    tagName: 'button',
    classList: ['todo-nav__btn', 'todo-nav__add-btn'],
    text: 'Add'
});

buttonAdd.addEventListener('click', function (e) {
    e.preventDefault();

    let inputText = taskMessage.value;
    addTask(inputText);

    taskMessage.value = '';
    taskMessage.focus()
});

let countAll = createNode({
    tagName: 'div',
    classList: ['todo-nav-center__count-all'],
    text: 'All:'
});

let countAllNumber = createNode({
    tagName: 'span',
    classList: ['todo-nav-center__count-num'],
    text: '0'
});

let countCompleted = createNode({
    tagName: 'div',
    classList: ['todo-nav-center__count-completed'],
    text: 'Completed: '
});

let countCompletedNumber = createNode({
    tagName: 'span',
    classList: ['todo-nav-center__count-completed-num'],
    text: '0'
});

let buttonShowAll = createNode({
    tagName: 'button',
    classList: ['todo-nav__btn', 'todo-nav__show-btn'],
    text: 'Show All'
});

buttonShowAll.addEventListener('click', function (event) {
    event.preventDefault();

    let elements = document.querySelectorAll('.todo-box');
    elements.forEach((item) => {
        if (item.classList.contains('hide')) {
            item.classList.remove('hide')
        }
    })
});

let buttonShowCompleted = createNode({
    tagName: 'button',
    classList: ['todo-nav__btn', 'todo-nav__completed-btn'],
    text: 'Show Completed',
});

buttonShowCompleted.addEventListener('click', function (event) {
    event.preventDefault();

    let elements = document.querySelectorAll('.todo-box');
    elements.forEach((item) => {
        if (item.classList.contains('complete')) {
        } else {

            item.classList.add('hide')
        }
    });
})

let searchTask = createNode({
    tagName: 'input',
    classList: ['todo-nav-center__search'],
    placeholder: 'Search',
});

searchTask.addEventListener('input', function () {
    let searchValue = this.value;
    let tasks = document.querySelectorAll('.todo-box');

    console.log(searchValue)

    tasks.forEach((elem) => {
        let inner = elem.querySelector('.todo-box__task');

        if (inner.innerText.indexOf(searchValue) === -1) {
            elem.classList.add('hide')
        } else {
            elem.classList.remove('hide');
        }
    });
});

buttonShowAll.addEventListener('click', function (event) {
    event.preventDefault();

    let items = document.querySelectorAll('.hide');

    items.forEach((element) => {
        element.classList.remove('hide');
    });
});


mainDiv.append(formToDo)
formToDo.append(titleToDo)
formToDo.append(innerToDo)

innerToDo.append(navSectionToDoTop);
innerToDo.append(navSectionToDoCenter);
innerToDo.append(navSectionToDoBottom);

navSectionToDoTop.append(buttonDeleteAll);
navSectionToDoTop.append(buttonDeleteLast);
navSectionToDoTop.append(taskMessage);
navSectionToDoTop.append(buttonAdd);

navSectionToDoCenter.append(countAll);
navSectionToDoCenter.append(countAllNumber);
navSectionToDoCenter.append(countCompleted);
navSectionToDoCenter.append(countCompletedNumber);
navSectionToDoCenter.append(buttonShowAll);
navSectionToDoCenter.append(buttonShowCompleted);
navSectionToDoCenter.append(searchTask);

function addTask(text, date = null, complete = false) {

    let todoBoxClassList = ['todo-box'];

    if (complete === true) {
        todoBoxClassList.push('complete')
    }

    let todoBox = createNode({
        tagName: 'div',
        classList: todoBoxClassList,
        text: ''
    });

    let todoInner = createNode({
        tagName: 'div',
        classList: ['todo-box__inner'],
        text: ''
    });

    let todoCheck = createNode({
        tagName: 'input',
        classList: ['todo-box__check'],
        type: 'checkbox',
        checked: complete
    });

    todoCheck.addEventListener('change', function (event) {
        event.preventDefault();

        let clickedElement = event.target;
        let toDoBox = findParent('todo-box', clickedElement);

        if (clickedElement.checked) {
            toDoBox.classList.add('complete')
        } else {
            toDoBox.classList.remove('complete');
        }

        refreshCompletedTaskCount();
        saveDataToLocalStorage();
    });

    let todoTask = createNode({
        tagName: 'div',
        classList: ['todo-box__task'],
        text: ''
    });

    let todoTaskBlock = createNode({
        tagName: 'div',
        classList: ['todo-box__block'],
    });

    let todoTaskButton = createNode({
        tagName: 'button',
        classList: ['todo-box__block-btn'],
    });

    todoTaskButton.addEventListener('click', function (event) {
        event.preventDefault();

        let clickElement = event.target
        let toDoBoxForDelete = findParent('todo-box', clickElement);
        toDoBoxForDelete.classList.add('fade');

        setTimeout(function () {
            toDoBoxForDelete.remove();
            refreshAllTaskCount();
            refreshCompletedTaskCount();
            saveDataToLocalStorage();
        }, 300)
    });

    let todoTaskDate = '';

    if (date !== null) {
        todoTaskDate = createNode({
            tagName: 'div',
            classList: ['todo-box__block-date'],
            text: date
        });
    } else {
        todoTaskDate = createNode({
            tagName: 'div',
            classList: ['todo-box__block-date'],
            text: new Date().toLocaleString('ru', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            })
        });
    }


    todoTask.innerText = text;
    todoTaskBlock.append(todoTaskButton);
    todoTaskBlock.append(todoTaskDate);
    todoInner.append(todoCheck);
    todoInner.append(todoTask);
    todoInner.append(todoTaskBlock);
    todoBox.append(todoInner);

    navSectionToDoBottom.append(todoBox);

    refreshAllTaskCount();
    refreshCompletedTaskCount();
    saveDataToLocalStorage();
}

let tasks = getDataFromLocalStorage();
tasks.forEach((item) => {
    addTask(item.text, item.date, item.complete);
})







