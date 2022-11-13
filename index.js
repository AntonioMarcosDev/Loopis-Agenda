//Datas
const preDate = new Date();
const localeDate = new Date().toLocaleString().slice(0, 10);
const day = localeDate.slice(0, 2);
const month = localeDate.slice(3, 5);
const year = localeDate.slice(6, 10);

let areaHoje = document.querySelector("#hoje-de-tarefas");
areaHoje.innerHTML = localeDate;

let listaTarefas = [];
let listaDias = [];

//Janelas
const windowAdd = document.querySelector("#tela-de-adicionar");
const windowEdit = document.querySelector("#tela-de-editar");
const windowRemove = document.querySelector("#tela-de-excluir");

//Formulários
const formAdd = document.querySelector("#form-de-adicionar");

//Areas
const areaTasks = document.querySelector(".tarefas");
const areaRemoveActivity = document.querySelector("#atividade-de-excluir");
const areaEditActivity = document.querySelector("#atividade-de-editar");
const areaDays = document.querySelector(".area-de-dias");
const hoje = document.querySelector(".hoje");

//Botões
const addInDaysBtn = document.querySelector("#adicionar-de-dias");
const addInTaskBtn = document.querySelector("#adicionar-de-tarefas");

const btnWindowRemoveCancel = document.querySelector("#cancelar-de-excluir");
const btnWindowRemoveRemove = document.querySelector("#excluir-de-excluir");
const btnWindowEditCancel = document.querySelector("#cancelar-de-editar");
const btnWindowEditSave = document.querySelector("#salvar-de-editar");

//Inputs
const inputAddName = document.querySelector("#nome-da-tarefa");
const inputAddTask = document.querySelector("#tarefa");
const inputAddDate = document.querySelector("#data");
const inputEditName = document.querySelector("#nome-da-tarefa-editar");
const inputEditTask = document.querySelector("#tarefa-editar");
const inputEditDate = document.querySelector("#data-editar");

// Funções
function removerListaTarefas(event) {
    let index = event.target.getAttribute('ordem-tarefa');
    listaTarefas.splice(index, 1);
    atualizarListaTarefas();
    removerDiasVazios();
    atualizarDias()
    windowRemove.style.display = "none";
}

function editarListaTarefas(event) {
    let index = event.target.getAttribute('ordem-tarefa');
    listaTarefas[index].nome = inputEditName.value;
    listaTarefas[index].detalhes = inputEditTask.value;
    atualizarListaTarefas();
    removerDiasVazios();
    atualizarDias();
    windowEdit.style.display = "none";
}

function janelaRemover(event) {
    let index = event.target.getAttribute('ordem-tarefa');
    areaRemoveActivity.innerHTML = "<strong>" + listaTarefas[index].nome + "</strong>";
    windowRemove.style.display = "flex";
    btnWindowRemoveCancel.addEventListener("click", () => {
        windowRemove.style.display = "none";
        return;
    });
    btnWindowRemoveRemove.setAttribute("ordem-tarefa", index);
    btnWindowRemoveRemove.addEventListener("click", removerListaTarefas)
}

function janelaEditar(event) {
    let index = event.target.getAttribute('ordem-tarefa');
    areaEditActivity.innerHTML = "<strong>" + listaTarefas[index].nome + "</strong>";
    inputEditName.value = listaTarefas[index].nome;
    inputEditTask.value = listaTarefas[index].detalhes;
    inputEditDate.valueAsDate = new Date(Date.UTC(Number(listaTarefas[index].data.slice(6, 10)), Number(listaTarefas[index].data.slice(3, 5)), Number(listaTarefas[index].data.slice(0, 2))))
    windowEdit.style.display = "flex";
    btnWindowEditCancel.addEventListener("click", () => {
        windowEdit.style.display = "none";
        return;
    });
    btnWindowEditSave.setAttribute("ordem-tarefa", index);
    btnWindowEditSave.addEventListener("click", editarListaTarefas)
}

function removerDiasVazios() {
    let datasDasTarefas = Array.from(new Set(listaTarefas.map(c => c.data)));
    listaDias = datasDasTarefas;
}

function atualizarListaTarefas() {
    areaTasks.innerHTML = "";
    for (let i = 0; i < listaTarefas.length; i++) {
        if (listaTarefas[i].data == areaHoje.innerHTML) {
            const tarefa = listaTarefas[i];
            const task = document.createElement("div");
            task.classList.add("task");
            const title = document.createElement("h1");
            title.innerText = tarefa.nome;
            const description = document.createElement("p");
            description.innerText = tarefa.detalhes;
            const buttonEdit = document.createElement("button");
            buttonEdit.classList.add("editor");
            buttonEdit.setAttribute('ordem-tarefa', i);
            buttonEdit.addEventListener("click", janelaEditar);
            const buttonRemove = document.createElement("button");
            buttonRemove.classList.add("removedor");
            buttonRemove.setAttribute('ordem-tarefa', i);
            buttonRemove.addEventListener("click", janelaRemover);
            task.appendChild(title);
            task.appendChild(description);
            task.appendChild(buttonEdit);
            task.appendChild(buttonRemove);
            areaTasks.appendChild(task);
        }
        localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
    }

}

function atualizarDias() {
    areaDays.innerHTML = "";
    listaDias = Array.from(new Set(listaDias));
    listaDias.sort(function (a, b) {
        let [a_dia, a_mes, a_ano] = a.split('/');
        let [b_dia, b_mes, b_ano] = b.split('/');
        let cmp = a_ano - b_ano;
        if (cmp === 0) {
            cmp = a_mes - b_mes;
            if (cmp === 0) {
                cmp = a_dia - b_dia;
            }
        }
        return cmp;
    });
    for (let i = 0; i < listaDias.length; i++) {
        const dia = listaDias[i];
        const day = document.createElement("button");
        day.classList.add("dia");
        const title = document.createElement("h1");
        title.classList.add("data-de-dias");
        title.innerHTML = dia.slice(0, 5);
        const year = document.createElement("p");
        year.classList.add("ano-de-dias");
        year.innerHTML = dia.slice(6, 10);
        const hojeAux = document.createElement("p");
        hojeAux.classList.add("hoje");
        (listaDias[i] == localeDate) ? hojeAux.innerHTML = "Hoje" : hojeAux.innerHTML = " - ";
        day.setAttribute('data-dia', i);
        day.addEventListener("click", () => {
            areaHoje.innerHTML = listaDias[i];
            atualizarListaTarefas();
        })
        day.appendChild(title);
        day.appendChild(year);
        day.appendChild(hojeAux);
        areaDays.appendChild(day);
        localStorage.setItem("dias", JSON.stringify(listaDias));
    }
}

function inserirPrimeiroDia() {
    if (!listaDias.length) {
        listaDias.push(localeDate);
        localStorage.setItem("dias", JSON.stringify(listaDias));
    }
}

//Adicionando funcionalidades
windowAdd.addEventListener("click", (event) => {
    if (!formAdd.contains(event.target)) {
        windowAdd.style.display = "none";
    }
});

addInDaysBtn.addEventListener("click", () => {
    windowAdd.style.display = "flex";
    inputAddName.value = "";
    inputAddTask.value = "";
    inputAddDate.value = "";
});

addInTaskBtn.addEventListener("click", () => {
    windowAdd.style.display = "flex";
    inputAddName.value = "";
    inputAddTask.value = "";
    inputAddDate.valueAsDate = new Date(Date.UTC(preDate.getFullYear(), preDate.getMonth(), preDate.getDate()));
});

formAdd.addEventListener("submit", (event) => {
    event.preventDefault();
    if (inputAddDate.value.split("-").reverse().join("/") === localeDate) {
        listaTarefas.push({
            nome: inputAddName.value,
            detalhes: inputAddTask.value,
            data: inputAddDate.value.split("-").reverse().join("/"),
        })
        atualizarDias();
        atualizarListaTarefas();
    } else {
        listaDias.push(inputAddDate.value.split("-").reverse().join("/"));
        listaTarefas.push({
            nome: inputAddName.value,
            detalhes: inputAddTask.value,
            data: inputAddDate.value.split("-").reverse().join("/"),
        })
        atualizarDias();
        atualizarListaTarefas();
    }
    windowAdd.style.display = "none";
});

window.addEventListener("load", () => {
    if (localStorage.getItem("tarefas")) {
        let tarefas = localStorage.getItem("tarefas");
        let tarefasObject = JSON.parse(tarefas);
        for (let i = 0; i < tarefasObject.length; i++) {
            listaTarefas.push(tarefasObject[i]);
        }
        atualizarListaTarefas();
    }
    if (!localStorage.getItem("dias")) {
        inserirPrimeiroDia();
        atualizarDias();
    } else {
        let dias = localStorage.getItem("dias");
        let diasObject = JSON.parse(dias);
        for (let i = 0; i < diasObject.length; i++) {
            listaDias.push(diasObject[i]);
        }
        atualizarDias();
    }
})