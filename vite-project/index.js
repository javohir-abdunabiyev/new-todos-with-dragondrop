import { postData } from "./lib/http"
import { reload } from "./lib/utils/reload"
import { todosload } from "./lib/utils/todos"
import { getData } from "./lib/http"

const modal_form = document.querySelector("dialog")
const dialog_open_btn = document.querySelector(".create-btn")
const close_modal = document.querySelector(".close_modal")
const add_card_btn = document.querySelector(".add-card-btn")
const form = document.forms.namedItem("add_task")
export const containers = document.querySelectorAll("[data-status]")


add_card_btn.onclick = () => {
    modal_form.showModal()
}


dialog_open_btn.onclick = () => {
    modal_form.showModal()
}

close_modal.onclick = () => {
    modal_form.close()
}

getData("/todos")
    .then(res => {
        const tasks = res.data
        reload(tasks, todosload, containers)
    })


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

            getData("/todos")
                .then(res => {
                    reload(res.data, todosload, containers)
                })

            
        }

        
        
        
    } catch (error) {
        console.error(error);
    }

}