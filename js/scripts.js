'use strict';

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

    const mail = document.querySelector('#email').value;
    const subject = document.querySelector('#title').value;
    const message = document.querySelector('#message').value;

    const dataFromForm = {
        mail,
        subject,
        message
    }
    getDataFromSrv(dataFromForm);
}

const form = document.querySelector('form');

form.addEventListener('submit', validateData);