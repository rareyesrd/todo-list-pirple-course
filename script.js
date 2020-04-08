const signUp = document.getElementById('signUp');
const logIn = document.getElementById('logIn');
const sendData = document.getElementById('sendData');
const login = document.getElementById('login');
const newTodo = document.getElementById('newTodo');
const textarea = document.getElementById('textarea');
const saveTodo = document.getElementById('saveTodo');
const dashboard = document.getElementById('dashboard');
const users = [];

function opendForm(e) {
    e.preventDefault();
    const target = e.target.id;
    const signUp = document.querySelector('.signUp');
    const logIn = document.querySelector('.logIn');
    if (target === 'signUp') {
        logIn.style.display = 'none';
        signUp.style.display = 'flex';
    } else {
        signUp.style.display = 'none';
        logIn.style.display = 'flex';
    }
}

const saveData = (e) => {
    e.preventDefault();
    formVerification();
}

const ckeckData = (e) => {
    e.preventDefault();
    const form = document.getElementById('form2');
    const email = document.getElementById('email2').value;
    const password = document.getElementById('password2').value;
    const newTodo = document.getElementById('newTodo');
    const db = [];

    if (email && password) {
        for (let i = 0; i < localStorage.length; i++) {
            let storage = JSON.parse(localStorage.getItem(`${localStorage.key(i)}`))
            db.push(storage);

            if (db[i].email === email &&
                db[i].password === password
            ) {
                completed(form);
                todoApp();
                break;
            } else {
                rejected('rejected2');
            }
        }
    } else {
        rejected('rejected2');
    }

}

function formVerification() {
    const form = document.getElementById('form');
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const agree = document.getElementById('agree');
    if (firstName && lastName && email && password && agree.checked) {
        registerUser();
        for (let i = 0; i < users.length; i++) {
            localStorage.setItem(`User: ${firstName}`, users[i])
        }
        completed(form);
    } else {
        rejected('rejected');
    }
}

function registerUser() {
    let obj = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    }
    users.push(JSON.stringify(obj));
}

function completed(form) {
    form.reset();
}

function rejected(str) {
    let rejected = document.querySelector(`.${str} h3`);
    rejected.classList.add('d-block');
    setTimeout(() => {
        if (rejected.classList = 'd-block') {
            rejected.classList.remove('d-block');
        }
    }, 2000)
}

function todoApp() {
    const logIn = document.querySelector('.logIn');
    logIn.style.display = 'none';
    dashboard.style.display = 'flex';
    console.log('You\'re login')
}

function displayTextarea() {
    textarea.style.display = 'block';
    saveTodo.style.display = 'block';
    newTodo.style.display = 'none';
}

function saveList() {
    textarea.style.display = 'none';
    newTodo.style.display = 'block';
    saveTodo.style.display = 'none';
    appendTodo();
}

function appendTodo() {
    let list = document.getElementById('list');
    let todo = textarea.value;
    let div = document.createElement('div');
    div.classList.add('item');
    div.innerHTML = ` <p> ${ todo } </p>`;
    list.appendChild(div)

}


logIn.addEventListener('click', opendForm)
signUp.addEventListener('click', opendForm);
sendData.addEventListener('click', saveData);
login.addEventListener('click', ckeckData);
newTodo.addEventListener('click', displayTextarea);
saveTodo.addEventListener('click', saveList);