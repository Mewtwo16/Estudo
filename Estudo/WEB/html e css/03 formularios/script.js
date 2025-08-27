
const amzUsuario = document.getElementById('user')
const amzEmail = document.getElementById('email')
const amzSenha = document.getElementById('password')
const btCadastro = document.getElementById('btCadastrar')

btCadastro.addEventListener('click', imprime)

function imprime(event){
    event.preventDefault();
    console.log(amzUsuario.value);
    console.log(amzEmail.value);
    console.log(amzSenha.value);
}