const signUp = document.getElementById('signUp');
const logIn = document.getElementById('logIn');
const sendData = document.getElementById('sendData');
const login = document.getElementById('login');
const logOut = document.getElementById('logOut');
const newTodo = document.getElementById('newTodo');
const titleList = document.getElementById('titleList');
const saveTodo = document.getElementById('saveTodo');
const dashboard = document.getElementById('dashboard');
const list = document.getElementById('list');

const users = [];

// Helpers

const dBlock = (el) => {
    el.style.display = 'block';
}
const dFlex = (el) => {
    el.style.display = 'flex';
}
const dNone = (el) => {
    el.style.display = 'none';
}
const create = (el) => {
    return document.createElement(el);
}


function opendForm(e) {
    e.preventDefault();
    const target = e.target.id;
    const signUp = document.querySelector('.signUp');
    const logIn = document.querySelector('.logIn');
    if (target === 'signUp') {
        dNone(logIn);
        dFlex(signUp);
    } else {
        dNone(signUp);
        dFlex(logIn);
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
    const db = [];

    for (let i = 0; i < localStorage.length; i++) {
        let storage = JSON.parse(localStorage.getItem(`${localStorage.key(i)}`))
        db.push(storage);
        let user = db[i].firstName;
        if (db[i].email === email &&
            db[i].password === password
        ) {
            completed(form);
            todoApp(user);
            break;
        } else {
            rejected('rejected2')
        }
    }
}

function formVerification() {
    const form = document.getElementById('form');
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const agree = document.getElementById('agree');
    if (firstName && lastName && password && agree.checked) {
        if (validateEmail(email)) {
            registerUser();
            for (let i = 0; i < users.length; i++) {
                localStorage.setItem(`User: ${firstName}`, users[i])
            }
            completed(form);
        } else {
            rejected('rejected');
        }
    } else {
        rejected('rejected');
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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

function todoApp(user) {
    const logInForm = document.querySelector('.logIn');
    dNone(this.logIn);
    dNone(this.signUp);
    this.logOut.classList.remove('d-none');
    dNone(logInForm);
    dBlock(dashboard);
    let Welcome = document.getElementById('welcome');
    let h1 = create('H1');
    h1.innerHTML = `Welcome ${user}`;
    Welcome.appendChild(h1);
}

function displaytitleList() {
    titleList.value = null;
    titleList.placeholder = 'Title here';
    dBlock(titleList);
    dBlock(saveTodo);
    dNone(newTodo);
}

function saveList() {
    dNone(titleList);
    dBlock(newTodo);
    dNone(saveTodo);
    if (titleList.value.length > 0) {
        appendTodo();
    }
}

function appendTodo() {
    let list = this.list.children;
    let deleteIcon = create('IMG');
    let newList = create('fieldset');
    let legend = create('legend');
    legend.innerHTML = `<h3>${ titleList.value }</h3>`;
    deleteIcon.src = './img/delete.svg';
    deleteIcon.classList.add('deleteList');
    newList.appendChild(deleteIcon)
    newList.appendChild(legend);
    this.list.prepend(newList);
    let div = create('DIV');
    div.classList.add('input');
    let checkedIcon = create('IMG');
    let input = create('input');
    checkedIcon.src = './img/checked.svg';
    div.appendChild(input);
    div.appendChild(checkedIcon);
    newList.appendChild(div);

    for (const prop of list) {
        prop.addEventListener('click', (e) => {
            if (e.target === deleteIcon) {
                this.list.removeChild(newList);
            } else {
                dFlex(div);
                if (e.target === checkedIcon) {
                    addToList(input.value, prop);
                    dNone(div);
                }
            }
        });
    }
}

function addToList(input, prop) {
    let div = create('div');
    div.classList.add('item');
    div.innerHTML = `<p> ${ input } </p>`;
    if (input.length > 0) {
        prop.appendChild(div);
    }
}




logIn.addEventListener('click', opendForm);
signUp.addEventListener('click', opendForm);
sendData.addEventListener('click', saveData);
login.addEventListener('click', ckeckData);
newTodo.addEventListener('click', displaytitleList);
saveTodo.addEventListener('click', saveList);