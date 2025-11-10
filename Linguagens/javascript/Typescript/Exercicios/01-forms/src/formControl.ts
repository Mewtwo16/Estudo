const SHOW_ERROR_MESSAGES = 'show-error-message';

import validator from "validator";

const form = document.querySelector('.form') as HTMLFormElement;
const username = document.querySelector('.username') as HTMLInputElement;
const email = document.querySelector('.email') as HTMLInputElement;
const password = document.querySelector('.password') as HTMLInputElement;
const password2 = document.querySelector('.password2') as HTMLInputElement;

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    hideErrorMessages(form);
    checkForEmptyFields(username, email, password, password2);
    checkEmail(email);
    checkPasswords(password, password2);
    if(isOk(form)) console.log('Formulario enviado')
});

function checkForEmptyFields(...inputs: HTMLInputElement[]): void{
    inputs.forEach(input => {
        if(!input.value) showErrorMessages(input, 'Campo não pode ficar vazio');
    })
}

function checkEmail(input: HTMLInputElement): void {
    if(!validator.isEmail(input.value)) showErrorMessages(input, 'Email invalido');
}

function checkPasswords(password: HTMLInputElement, password2:HTMLInputElement){
    if(password.value !== password2.value){
        showErrorMessages(password, 'Senhas diferentes');
        showErrorMessages(password2, 'Senhas diferentes');
    }
}

function hideErrorMessages(form: HTMLFormElement): void {
    form.querySelectorAll('.' + SHOW_ERROR_MESSAGES).forEach(item => item.classList.remove(SHOW_ERROR_MESSAGES));
}

function showErrorMessages(input: HTMLInputElement, msg: string): void {
    const formFields = input.parentElement as HTMLDivElement;
    const errorMessages = formFields.querySelector('.error-message') as HTMLSpanElement;
    errorMessages.innerText = msg;
    formFields.classList.add(SHOW_ERROR_MESSAGES);
}

function isOk(form: HTMLFormElement): boolean {
    let ok = true;
    form.querySelectorAll('.' + SHOW_ERROR_MESSAGES).forEach(() => (ok = false))
    return ok;
}
