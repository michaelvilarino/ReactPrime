import axios from "axios";

export const key = 'acd58d57c2154a133c3eac133adfd585'

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3'
})

export default api;