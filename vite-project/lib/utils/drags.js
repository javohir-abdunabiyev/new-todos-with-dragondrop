import { containers } from "../.." 
import { deleteData } from "../http"

export const bin = document.querySelector(".bin")

bin.ondrop = async (e) => {
    try {
        const droppingElem = document.querySelector("[data-selected]");
        if (droppingElem) {
            const taskId = droppingElem.id;
            await deleteData(`/todos/${taskId}`);
            droppingElem.remove();
            console.log(`Задача с id ${taskId} удалена`);
        } else {
            console.error("Элемент для удаления не найден");
        }
    } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
    }
};


export function todosDrag(todos) {
    for (let container of containers) {
        const parent = container.parentElement

        container.ondragover = (e) => {
            e.preventDefault()
        }

        container.ondragenter = (e) => {
            e.preventDefault()
            parent.classList.add("hovered")
        }

        container.ondragleave = () => {
            parent.classList.remove("hovered")
        }

        
    }


    bin.ondragenter = () => {
        bin.src = "/img/openedbin.png"
        bin.style.transform = ".5s ease-in"
    }

    bin.ondragleave = () => {
        bin.src = "/img/closedbin.png"
    }


    todos.ondragstart = () => {
        todos.dataset.selected = true
        setTimeout(() => {
            todos.classList.add("hide")
        }, 0)

        bin.style.display = "block"

    }

    todos.ondragend = () => {
        delete todos.dataset.selected
        todos.classList.remove("hide")
        bin.style.display = "none"
        // bin.style.display = "none"
    }
}
