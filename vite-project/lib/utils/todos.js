import { todosDrag } from "./drags";
import { containers } from "../..";
import { patchData } from "../http";
import { deleteData } from "../http";
import { bin } from "./drags";

for (let container of containers) {
    container.ondrop = async (e) => {
        try {
            const parent = container.parentElement
            const droppingElem = document.querySelector("[data-selected]");
            container.append(droppingElem);

            parent.classList.remove("hovered")
            const taskId = droppingElem.id;
            const newStatus = container.dataset.status;

            const updatedTask = {
                status: newStatus
            };
            await patchData(`/todos/${taskId}`, updatedTask);


            bin.ondrop = async () => {
                await deleteData(`/todos/${taskId}`)
            }


        } catch (error) {
            console.error(error);
        }
    };
}

export function todosload(item) {
    const todos_div = document.createElement("div");
    todos_div.classList.add("todos_div");
    todos_div.id = item.id;
    todos_div.draggable = true;

    const description = item.description;
    todos_div.append(description);

    todosDrag(todos_div);

    return todos_div;
}
