

(function(){

    const inputTarefa = document.querySelector('.input-tarefa');
    const listaTarefa = document.querySelector('.lista-tarefas');
    const btnTarefa = document.querySelector('.btn-add');

    function criaLi(){
        const li = document.createElement('li');
        return li;
    }

    inputTarefa.addEventListener('keypress', function(e){
        if(e.keycode === 13){
           if(!inputTarefa.value) return;
            criaTarefa(inputTarefa.value); 
        }
    });

    function limpaInput(){
        inputTarefa.value = '';
        inputTarefa.focus();
        salvarTarefa();
    }

    function criaApagar(li){
        li.innerText += ' ';
        const btnApagar = document.createElement('button');
        btnApagar.innerText = 'Apagar';
        btnApagar.setAttribute('class', 'apagar');
        li.appendChild(btnApagar);
        salvarTarefa();
    }

    function criaTarefa(textoInput){
        const li = criaLi();
        li.innerHTML = textoInput;
        listaTarefa.appendChild(li);
        limpaInput();
        criaApagar(li);
    }

    btnTarefa.addEventListener('click', function(){
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    });

    document.addEventListener('click', function(e){
        const el = e.target;
        if(el.classList.contains('apagar')){
            el.parentElement.remove();
        }
    })

    function salvarTarefa(){
        const liTarefas = listaTarefa.querySelectorAll('li');
        const listaDeTarefas = [];

        for(let tarefa of liTarefas){
            let tarefaTexto = tarefa.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
            listaDeTarefas.push(tarefaTexto);
        }
        const tarefasJSON = JSON.stringify(listaDeTarefas);
        localStorage.setItem('tarefas', tarefasJSON);
    }

    function lerTarefasSalvas(){
        const tarefas = localStorage.getItem('tarefas');
        const listaTarefas = JSON.parse(tarefas);

        for(let tarefa of listaTarefas){
            criaTarefa(tarefa);
        }
    }

    lerTarefasSalvas();

})();