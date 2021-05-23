let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#task_input');
let inputBtn = document.querySelector('#task-btn');
let filterTask = document.querySelector('#filterTask');
let ul = document.querySelector('ul');
let clearBtn = document.querySelector('#clearBtn');

// Add eventListener
form.addEventListener ('submit', addTask);
ul.addEventListener('click', removeTask);
clearBtn.addEventListener('click', removeAll);
filterTask.addEventListener('keyup', filter);
document.addEventListener('DOMContentLoaded', getData);





// functions calling
// adding task

function addTask (e) {
    if (taskInput.value === '') {
        alert("Please enter a task");
    }else {
        // creating list
        let li = document.createElement('li');

        // creating text
        let newTask = document.createTextNode(taskInput.value);

        // adding text to li
        li.appendChild(newTask);

        // create link for remove
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        link.style.marginLeft = '10px';

        // addimg link to li
        li.appendChild(link);

        // adding li to ul
        ul.appendChild(li);

        // adding elements to local store
        setItemToLocalStore(taskInput.value);

        // making the field blank
        taskInput.value = '';
    }

    e.preventDefault();

}

// Removing task
function removeTask (e) {

    if (e.target.hasAttribute('href')){
        if (confirm('Are you sure?')){
            e.target.parentElement.remove();

            removeFromLS(e.target.parentElement);
        }
    }
}


// Removing All tasks
function removeAll(e){
    ul.innerHTML = '';
// clear the local storage
    localStorage.clear();

}

// filter the li
function filter (e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach( task => {
        let item = task.firstChild.textContent ;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'list-item';
        }else {
            task.style.display = 'none';
        }
    })
}

// local store setup
function setItemToLocalStore(task) {
    let tasks;
    if (localStorage.getItem('tasks') == null)  {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// getting data on browser from local store
function getData (){
    let tasks;
    if (localStorage.getItem('tasks') == null)  {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach( task => {
                // creating list
                let li = document.createElement('li');

                // creating text
                let newTask = document.createTextNode(task);
        
                // adding text to li
                li.appendChild(newTask);
        
                // create link for remove
                let link = document.createElement('a');
                link.setAttribute('href', '#');
                link.innerHTML = 'x';
                link.style.marginLeft = '10px';
        
                // addimg link to li
                li.appendChild(link);
        
                // adding li to ul
                ul.appendChild(li);
    })
}



// removeFromLS
function removeFromLS(taskRemove){
    let tasks;
    if (localStorage.getItem('tasks') == null)  {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskRemove;
    li.removeChild(li.lastChild);

    tasks.forEach((item, index) => {
        if (li.textContent.trim() == item) {
            tasks.splice(index, 1);
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}