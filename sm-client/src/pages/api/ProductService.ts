import axios, {AxiosResponse} from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL)

export const api = axios.create({
    baseURL: API_URL,
});

export const pagingCountry = (searchObject: any) => {
    const url = "/searchByPage";
    return axios.post(url, searchObject);
};
export const getAllProduct = async (endpoint: string): Promise<AxiosResponse> => {
    try {
        const response = await api.get(endpoint);
        return response;
    } catch (error) {
        throw error;
    }
};

export const fetchData = async (endpoint: string): Promise<AxiosResponse> => {
    try {
        const response = await api.get(endpoint);
        return response;
    } catch (error) {
        throw error;
    }
};