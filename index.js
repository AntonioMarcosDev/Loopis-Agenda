//Datas
const preDate = new Date();
const localeDate = new Date().toLocaleString().slice(0, 10);
const day = localeDate.slice(0, 2);
const month = localeDate.slice(3, 5);
const year = localeDate.slice(6, 10);

document.querySelector("#data-de-dias").innerHTML = `${day}/${month}`;
document.querySelector("#ano-de-dias").innerHTML = year;
document.querySelector("#hoje-de-tarefas").innerHTML = localeDate;

let listaTarefas = [];

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

//Botões
const addInDaysBtn = document.querySelector("#adicionar-de-dias");
const addInTaskBtn = document.querySelector("#adicionar-de-tarefas");

const btnWindowRemoveCancel = document.querySelector("#cancelar-de-excluir");
const btnWindowRemoveRemove = document.querySelector("#excluir-de-excluir");
const btnWindowEditCancel = document.querySelector("#cancelar-de-editar");
const btnWindowEditSave = document.querySelector("#salvar-de-salvar");

//Inputs
const inputAddName = document.querySelector("#nome-da-tarefa");
const inputAddTask = document.querySelector("#tarefa");
const inputAddDate = document.querySelector("#data");
const inputEditName = document.querySelector("#nome-da-tarefa-editar");
const inputEditTask = document.querySelector("#tarefa-editar");
const inputEditDate = document.querySelector("#data-editar");

// Funções
function janelaRemover(event) {
    let index = event.target.getAttribute('ordem-tarefa');
    areaRemoveActivity.innerHTML = "<strong>" + listaTarefas[index].nome + "</strong>";
    windowRemove.style.display = "flex";
    btnWindowRemoveCancel.addEventListener("click", () => {
        windowRemove.style.display = "none";
    });
    btnWindowRemoveRemove.addEventListener("click", removerListaTarefas)
}

function janelaEditar(event) {
    let index = event.target.getAttribute('ordem-tarefa');
    areaEditActivity.innerHTML = "<strong>" + listaTarefas[index].nome + "</strong>";
    inputEditName.value = listaTarefas[index].nome;
    inputEditTask.value = listaTarefas[index].detalhes;
    windowEdit.style.display = "flex";
    btnWindowEditCancel.addEventListener("click", () => {
        windowEdit.style.display = "none";
    });
}

function removerListaTarefas(event) {
    let index = event.target.getAttribute('ordem-tarefa');
    listaTarefas.splice(index, 1);
    atualizarListaTarefas();
    windowRemove.style.display = "none";
}

function atualizarListaTarefas() {
    areaTasks.innerHTML = "";
    for (let i = 0; i < listaTarefas.length; i++) {
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
        })
        atualizarListaTarefas();
    }
    windowAdd.style.display = "none";
});