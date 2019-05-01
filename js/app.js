class Task{
    constructor(name){
        this.name = name;
        this.isComplete = false;
    }
    complete(){
        this.isComplete = !this.isComplete;//será el opuesto que ya tenia
    }
}

class TaskList {
    constructor(name){
        this.name = name;
        this.tasks = [];
    }

    addTask(task,element){
        this.tasks.push(task);//coger una tarea y meterla en el array
        this.renderTasks(element);
    }
    removeTask(i,element){
        this.tasks.splice(i,1);//el 1 es el número de elementos que se quitará
        this.renderTasks(element);
    }
    renderTasks(element){
        let tasks = this.tasks.map(task =>`
        

            <li class="task ${task.isComplete ? 'complete' : ''}">
                
                    <input type = "checkbox" class="task__complete-button"
                    ${task.isComplete ? 'checked' : ''} >

                    <span class="task__name">${task.name}</span>
                
                <a hre="#" class="task__remove-button">X</a>
            </li>
        
        `);//map hace es coger cada elemento de un array
        //y transformarlo y devolverlo en un nuevo array
        
        element.innerHTML = tasks.reduce((a,b) => a + b, '');//reduce lo que hace es a partir de un array, crear un solo elemento.
        // se pobe la suma porq la suma hace concatenar cada elemento
    }
}

//Trabajar con el DOM
const addTaskElement = document.getElementById('add-task');//elemento desde el cual se va a añadir las tareas


const tasksContainerElement = document.getElementById('tasks-container');//contenedor de las tareas

const inbox = new TaskList('inbox');//se tiene una nueva lista de tarea

//Añadir tarea desde el DOM
function addDOMTask(e, list = inbox){
    //-obtener el texto del input
    if(e.key === 'Enter'){
        //-crear la tarea instanciando la clase
        let task = new Task(this.value);//se instancia y se crea la tarea
        //con el value del input
        
        //-añadir la tarea a la lista
        list.addTask(task,tasksContainerElement);

        //-borrar el texto del input
        this.value = '';
    }
        
}
//añadir un escuchador de eventos
//keyup es el evento que ocurre cuando se suelta una tecla
addTaskElement.addEventListener('keyup',addDOMTask);

//obtener indice de la tarea actual
function getTaskIndex(e){
let taskItem = e.target.parentElement,//seleccionamos al padre del elemento
tasksItems = [...tasksContainerElement.querySelectorAll('li')];

//ejecutar metodo remove task
//remover tarea de la lista(se necesita el indice)
return tasksItems.indexOf(taskItem);
}

//Eliminar tarea desde el DOM
function removeDOMtask(e,list = inbox){
    
    //detectar que se hizo click en el enlace
    if(e.target.tagName === 'A'){//tagName es el nombre de la etiqueta
        list.removeTask(getTaskIndex(e),tasksContainerElement);
    }

};
//delegación de eventos...para ahorrar memoria
//utilizar eventos
tasksContainerElement.addEventListener('click',removeDOMtask);

//Completar la tarea
function completeDOMtask(e,list = inbox){
    
    //detectar que se hizo click en el input
    if(e.target.tagName === 'INPUT'){//tagName es el nombre de la etiqueta
        //completar la tarea de la lista (se necesita el indice)
        list.tasks[getTaskIndex(e)].complete();
        e.target.parentElement.classList.toggle('complete');//para que se subyare el item completado
        // console.table(list.tasks);
        
    }
};
tasksContainerElement.addEventListener('click',completeDOMtask);