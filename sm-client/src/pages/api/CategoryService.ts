import axios, {AxiosResponse} from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(apiUrl)

export const api = axios.create({
    baseURL: apiUrl,
});

export const getAllCategory = async (endpoint: string): Promise<AxiosResponse> => {
    try {
        const response = await api.get(endpoint);
        return response;
    } catch (error) {
        throw error;
    }
};

export const fetchData = async (endpoint: string): Promise<AxiosResponse> => {
    return await api.get(endpoint);
};
