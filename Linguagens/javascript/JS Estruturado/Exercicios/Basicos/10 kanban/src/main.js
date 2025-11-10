
(function () {

    let tarefas = [];
    let id = 1;
    const form = document.querySelector('#form-nova-tarefa')
    const coluna = document.querySelectorAll('.coluna');

    function Tarefa(id, descricao, status = 'a-fazer') {
        this.id = id;
        this.descricao = descricao;
        this.status = status
    };

    function criaTarefa() {
        const inputDescricao = form.querySelector('#input-descricao-tarefa')
        const novaTarefa = new Tarefa(id, inputDescricao.value, 'a-fazer');
        tarefas.push(novaTarefa);
        id++;
        inputDescricao.value = '';
        inputDescricao.focus();
        console.log('Tarefa Criada!');
    }

    function criaTag(tag) {
        const criaTag = document.createElement(tag);
        return criaTag;
    }

    function criaBTN(li) {
        li.innerText += ' ';
        const btnApagar = document.createElement('button');
        const btnMover = document.createElement('button');
        btnApagar.innerText = 'Apagar';
        btnMover.innerText = 'Mover';
        btnApagar.setAttribute('class', 'apagar');
        btnMover.setAttribute('class', 'mover')
        li.appendChild(btnApagar);
        li.appendChild(btnMover);
    }

    function renderQuadro() {
        const listas = document.querySelectorAll('.lista-tarefas');
        listas.forEach((coluna) => coluna.innerHTML = '');
        const aFazer = document.querySelector('#coluna-a-fazer');
        const emAndamento = document.querySelector('#coluna-em-andamento');
        const concluido = document.querySelector('#coluna-concluido');
        tarefas.forEach((valor) => {
            const novali = criaTag('li');
            novali.innerText = `${valor.id} ${valor.descricao}`;
            criaBTN(novali);
            try {
                if (valor.status === 'a-fazer') {
                    novali.dataset.id = valor.id;
                    aFazer.appendChild(novali)
                };
                if (valor.status === 'em-andamento') {
                    novali.dataset.id = valor.id;
                    emAndamento.appendChild(novali)
                };
                if (valor.status === 'concluido') {
                    novali.dataset.id = valor.id;
                    concluido.appendChild(novali)
                };
            } catch (error) {
                console.error('[Erro fatal] Falha ao carregar listas')
            };
        })
    }

    function apagaTarefa(id) {
        const novaLista = tarefas.filter((valor) => valor.id !== id);
        return novaLista;
    }

    function moveTarefa(id) {
        const novaLista = tarefas.find((obj) => {
            if (obj.id === id) {
                switch (obj.status) {
                    case 'a-fazer': {
                        obj.status = 'em-andamento';
                        break;
                    }
                    case 'em-andamento': {
                        obj.status = 'concluido'
                        break;
                    }
                    case 'concluido': {
                        obj.status = 'a-fazer';
                        break;
                    }
                }
            } 
        })
        return novaLista;
    }

    function salvarTarefa(){
        const listaSalva = tarefas.map((valor) => valor);
        const tarefasJSON = JSON.stringify(listaSalva);
        localStorage.setItem('tarefas', tarefasJSON);
    }

    function recuperaTarefa(){
        const carregaTarefas = localStorage.getItem('tarefas');
        if(carregaTarefas){
            tarefas == JSON.parse(carregaTarefas);
        };
        
    }

    addEventListener('click', (e) => {
        const el = e.target;
        const rmID = Number(el.parentElement.dataset.id);
        if (el.classList.contains('apagar')) {
            tarefas = apagaTarefa(rmID);
            salvarTarefa();
            renderQuadro();
        };
        if (el.classList.contains('mover')) {
            moveTarefa(rmID);
            salvarTarefa();
            renderQuadro();
        }
    })

    recuperaTarefa();
    renderQuadro();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        criaTarefa();
        salvarTarefa();
        renderQuadro();
    })


})();