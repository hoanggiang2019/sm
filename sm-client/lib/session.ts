import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const tokenType = process.env.NEXT_PUBLIC_TOKEN_TYPE;

export const api = axios.create({
    baseURL: apiUrl,
});

export async function authenticate(username: string, password: string) {
    try {
        const response = await axios.post("api/v1/auth/authenticate", {
            username: username,
            password: password
        })
        return response?.data
    } catch (e) {
        return null
    }
}


export async function getCurrentUser(token: string) {
    try {
        const headers = {'Authorization': tokenType + token};
        const session = await api.get("api/common/getCurrentUser", {headers})
        return session?.data
    } catch (e) {
        return null
    }
}


export async function getCategory() {
    try {
        const session = await api.get("api/category/getAllCategories")
        return session?.data
    } catch (e) {
        return null
    }
}

export async function getAllProduct() {
    try {
        const session = await api.get("api/warehouse/getAllProduct")
        return session?.data
    } catch (e) {
        return null
    }
}

export async function saveProduct(product: ProductProp | undefined) {
    try {
        const session = await api.post("api/warehouse/addProduct", product)
        return session?.data
    } catch (e) {
        return null
    }
}
