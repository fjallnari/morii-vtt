import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: "/api",
});