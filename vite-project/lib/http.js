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