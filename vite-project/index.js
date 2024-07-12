import { postData } from "./lib/http"
import { reload } from "./lib/utils/reload"
import { todosload } from "./lib/utils/todos"
import { getData } from "./lib/http"

const modal_form = document.querySelector("dialog")
const dialog_open_btn = document.querySelector(".create-btn")
const close_modal = document.querySelector(".close_modal")


const form = document.forms.namedItem("add_task")

const todos_place = document.querySelector(".todos")

const inprogress_place = document.querySelector(".inprogress")

const ready_place = document.querySelector(".ready")


let allTasks = JSON.parse(localStorage.getItem('tasks')) || []

const setItemStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(allTasks))
    
}

window.onload = () => {
    reload(allTasks.filter(t => t.status === 'todo'), todosload, todos_place)
    reload(allTasks.filter(t => t.status === 'inProgress'), todosload, inprogress_place)
    reload(allTasks.filter(t => t.status === 'completed'), todosload, ready_place)
}



dialog_open_btn.onclick = () => {
    modal_form.showModal()
}

close_modal.onclick = () => {
    modal_form.close()
}

form.onsubmit = async (e) => {
    e.preventDefault()

    const fm = new FormData(e.target)

    const tasks = {
        id: crypto.randomUUID(),
        title: fm.get("title"),
        description: fm.get("description"),
        createdAt: new Date().toLocaleDateString(),
        status: fm.get("status")
    }

    try {
        const res = await postData('/todos', tasks);
        if (res.status === 200 || res.status === 201) {
            alert('Успешно');
            form.reset();

            allTasks.push(tasks)
            setItemStorage()

            getData("/todos")
                .then(res => {
                    const task = res.data
                        if (tasks.status === "todo") {
                            reload(task.filter(t => t.status === 'todo'), todosload, todos_place);
                        } else if (tasks.status === "inProgress") {
                            reload(task.filter(t => t.status === 'inProgress'), todosload, inprogress_place);
                        } else if (tasks.status === "completed") {
                            reload(task.filter(t => t.status === 'completed'), todosload, ready_place);
                        }
                })
        }

        
        
        
    } catch (error) {
        console.error(error);
    }

}


