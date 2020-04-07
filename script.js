const signUp = document.getElementById('signUp');
const logIn = document.getElementById('logIn');
const sendData = document.getElementById('sendData');
const verifyData = document.getElementById('verifyData');

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

    if (localStorage.getItem('email') === email &&
        localStorage.getItem('password') === password
    ) {
        completed(form);
        todoApp();
    }else{
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
            localStorage.setItem(`${firstName}`, users[i])
        }
        completed(form);
    } else {
        rejected('rejected');
    }
}

function registerUser(){
    let obj ={
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

function todoApp(){

}






logIn.addEventListener('click', opendForm)
signUp.addEventListener('click', opendForm);
sendData.addEventListener('click', saveData);
verifyData.addEventListener('click', ckeckData);