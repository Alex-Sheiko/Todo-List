export {createNode,findParent, calculateAllTask, refreshAllTaskCount, calculateCompletedTask, refreshCompletedTaskCount, saveDataToLocalStorage,
    getDataFromLocalStorage}

function createNode(option) {
    const node = document.createElement(option.tagName);
    node.classList.add(...option.classList)

    if (option.hasOwnProperty('text')) {
        node.innerText = option.text;
    }

    if (option.hasOwnProperty('placeholder')) {
        node.placeholder = option.placeholder;
    }

    if (option.hasOwnProperty('title')) {
        node.title = option.title;
    }

    if (option.hasOwnProperty('id')) {
        node.id = option.id;
    }

    if (option.hasOwnProperty('type')) {
        node.type = option.type;
    }

    if (option.hasOwnProperty('checked')) {
        node.checked = option.checked;
    }

    return node;
}

function findParent(searchClass, node) {
    let parentBlock = node.parentElement;

    if (parentBlock.classList.contains(searchClass)) {
        return parentBlock;
    } else {
        return findParent(searchClass, parentBlock)
    }
}

function calculateAllTask() {
    let elements = document.querySelectorAll('.todo-box');
    return elements.length
}

function refreshAllTaskCount() {
    let allTaskCount = calculateAllTask();

    let node = document.querySelector('.todo-nav-center__count-num');
    node.innerText = allTaskCount
}

function calculateCompletedTask() {
    let elements = document.querySelectorAll('.todo-box.complete');
    return elements.length
}

function refreshCompletedTaskCount() {
    let node = document.querySelector('.todo-nav-center__count-completed-num');
    node.innerText = calculateCompletedTask()
}

function saveDataToLocalStorage() {
    let data = [];

    let items = document.querySelectorAll('.todo-box');
    items.forEach((elem, i) => {

        let textTaskNode = elem.querySelector('.todo-box__task');
        let text = textTaskNode.innerText

        let dateNode = elem.querySelector('.todo-box__block-date');
        let date = dateNode.innerText;

        let classList = elem.classList;
        let complete = false;

        classList.forEach((item) => {
            if (item === 'complete') {
                complete = true;
            }
        })

        data.push({
            index: i,
            text: text,
            date: date,
            complete: complete
        });
    });

    localStorage.removeItem('todoList');
    localStorage.setItem('todoList', JSON.stringify(data))
}

function getDataFromLocalStorage() {
    let data = localStorage.getItem('todoList');
    return JSON.parse(data)
}
