'use strict';

const menuHam = document.querySelector('nav .material-icons');
const menu = document.querySelector('.div-menu');
const links = document.querySelectorAll('.div-menu a, .div-menu .material-icons');

links.forEach(elem => {
    elem.addEventListener('click', () => {
        menu.classList.add('hide-menu');
    })
})

menuHam.addEventListener('click', () => {
    menu.classList.remove('hide-menu')
})

const labelAll = document.querySelectorAll('label');
const labelVal = [];
labelAll.forEach(elem => {
    labelVal.push(elem.innerText);
});
const showError = (label, textError) => {
    label.innerText = textError;
    label.classList.add('alert', 'alert-danger');
}

// showError(labelAll[0], 'Uzupełnij adres email')
const getDataFromSrv = async dataFromForm => {
    const urlRestApi = 'http://localhost:8888/validate';
    const method = 'post';
    const dataToSend = dataFromForm;
    const headers = {
        "Content-Type": "application/json"
    }
    try{
        const response = await fetch(urlRestApi, {
            method,
            body: JSON.stringify(dataToSend),
            headers
        })
        const getDataFromSrv = await response.json();
        console.log(getDataFromSrv);
        return getDataFromSrv;
    }catch(error) {
        console.error(error);
    }
}

const validateData = event => {
    event.preventDefault();
    
    const resPlace = document.querySelector('#result-place');
    resPlace.innerText = '';
    resPlace.classList.remove('alert','alert-succes');
    
    labelAll.forEach((elem,i)=>{
        elem.classList.remove('alert','alert-danger');
        elem.innerText = labelVal[i];
    });

    const mail = document.querySelector('#email').value;
    const subject = document.querySelector('#title').value;
    const message = document.querySelector('#message').value;

    const dataFromForm = {
        mail,
        subject,
        message
    }
    getDataFromSrv(dataFromForm)
    .then(res => {
        console.log(res);

        if('send' in res) {
            resPlace.innerText = res.send;
            resPlace.classList.add('alert','alert-succes')
            document.querySelectorAll('input:not(input[type="submit"]),textarea').forEach(elem => {
                elem.value = '';
            });

        }else{
            if('email' in res){
                showError(labelAll[0], res.email);
            }
            if('subject' in res){
                showError(labelAll[1], res.subject);
            }
            if('message' in res){
                showError(labelAll[2], res.message);
            }
            
        }
    });
}

const form = document.querySelector('form');

form.addEventListener('submit', validateData);
