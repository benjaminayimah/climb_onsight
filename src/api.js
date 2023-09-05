import axios from "axios";
export async function getApi(url, options = {}) {
    const response = await axios.get(url, options);
    return response;
}
export async function postApi(url, options = {}) {
    const response = await axios.post(url, options);
    return response;
}
export async function putApi(url, options = {}) {
    const response = await axios.put(url, options);
    return response;
}
export async function deleteApi(url, options = {}) {
    const response = await axios.delete(url, options);
    return response;
}