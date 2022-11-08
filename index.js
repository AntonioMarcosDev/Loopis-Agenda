// Colocando a data de hoje na página inicial e no dia
const dataPre = new Date();
const date = new Intl.DateTimeFormat("pt-br").format(dataPre);
const areaDataTarefas = document.querySelector("#hoje-de-tarefas");
areaDataTarefas.innerHTML = `${date}`;
const areaAnoDias = document.querySelector("#ano-de-dias");
areaAnoDias.innerHTML = `${date.slice(-4)}`;
const areaDataDias = document.querySelector("#data-de-dias");
areaDataDias.innerHTML = `${date.slice(0, 5)}`;
//Janelas
const windowAddTask = document.querySelector(".tela-de-adicionar");
const windowEditTask = document.querySelector(".tela-de-editar");
const windowRemoveTask = document.querySelector(".tela-de-excluir");

//Botões
const buttonAddDays = document.querySelector("#adicionar-de-dias");
const buttonAddTask = document.querySelector("#adicionar-de-tarefas");
const buttonWindowAdd_Add = document.querySelector("#adicionar-de-adicionar");
const buttonWindowEdit_Cancel = document.querySelector("#cancelar-de-editar");
const buttonWindowEdit_Save = document.querySelector("#salvar-de-editar");
const buttonWindowRemove_Cancel = document.querySelector("#cancelar-de-excluir");
const buttonWindowRemove_Remove = document.querySelector("#excluir-de-excluir");

//Areas
const areaTasks = document.querySelector(".tarefas");

//Inputs
const inputName = document.querySelector("#nome-da-tarefa");
const inputTask = document.querySelector("#tarefa");
const inputDate = document.querySelector("#data");

//Fazendo os botões abrirem as paginas correspondentes
buttonAddDays.addEventListener("click", () => {
    windowAddTask.style.display = "flex";
    inputName.value = "";
    inputTask.value = "";
    inputDate.value = "";
})

buttonAddTask.addEventListener("click", () => {
    windowAddTask.style.display = "flex";
    inputName.value = "";
    inputTask.value = "";
    inputDate.valueAsDate = new Date(Date.UTC(dataPre.getFullYear(), dataPre.getMonth(), dataPre.getDate()));
})

buttonWindowAdd_Add.addEventListener("click", () => {
    if (inputDate.value.split("-").reverse().join("/") === date) {
        if (inputTask.value != "" && inputName.value != "") {
            const title = document.createElement("h1");
            title.innerText = inputName.value;
            const description = document.createElement("p");
            description.innerText = inputTask.value;
            const task = document.createElement("div");
            task.classList.add("task");
            const buttonEdit = document.createElement("button");
            buttonEdit.id = 'editor';
            const buttonRemove = document.createElement("button");
            buttonRemove.id = 'removedor';
            task.appendChild(title);
            task.appendChild(description);
            task.appendChild(buttonEdit);
            task.appendChild(buttonRemove);
            areaTasks.appendChild(task);
            buttonRemove.addEventListener("click", () => {
                windowRemoveTask.style.display = "flex";
                document.querySelector("#atividade").innerText = inputName.value;
                buttonWindowRemove_Cancel.addEventListener("click", () => {
                    windowRemoveTask.style.display = "none";
                })
                buttonWindowRemove_Remove.addEventListener("click", () => {
                    areaTasks.remove(task);
                    windowRemoveTask.style.display = "none";
                })
            })

            buttonEdit.addEventListener("click", () => {
                windowEditTask.style.display = "flex"
            })
        }
    }
    windowAddTask.style.display = "none";
})
