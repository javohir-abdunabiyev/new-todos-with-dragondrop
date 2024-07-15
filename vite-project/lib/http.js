import axios from "axios"
const base_url = import.meta.env.VITE_BASE_URL

export async function postData(endpoint, user) {

    try {
        const res = await axios.post(base_url + endpoint, user)
        return res
    } catch(error) {
        return {status: 500, error}
    }

}


export const getData = async (endpoint) => {
    try {
        const res = await axios.get(base_url + endpoint)

        return res
    } catch(e) {
        console.error(error)
    }
}


export const patchData = async (path, body) => {
    try {
       const res = await axios.patch(base_url + path, body)

       return res
    } catch(e) {
       alert(e.message, 'error')
    }
}


export const deleteData = async (path) => {
    try {
       const res = await axios.delete(base_url + path)

       return res
    } catch(e) {
       console.error("Ошибка при удалении данных:", e);
    }
}
