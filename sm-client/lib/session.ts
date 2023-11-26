import axios from "axios";
import {getCookie, setCookie} from "cookies-next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const tokenType = process.env.NEXT_PUBLIC_TOKEN_TYPE;


export const api = axios.create({
    baseURL: apiUrl,
});

export async function authenticate(username: string, password: string) {
    try {
        const response = await api.post("api/v1/auth/authenticate", {
            username: username,
            password: password
        })
        const token = response?.data.access_token;
        setCookie("token", token)
        return token
    } catch (e) {
        alert("Error authenticate")
        return null
    }
}

function getToken() {
    const token = getCookie("token");
    const headers = {
        Authorization: token ? tokenType + token : null,
    }

    return headers;
}

export async function getCurrentUser() {
    try {
        const headers = getToken()
        const session = await api.get("api/common/getCurrentUser", {headers})
        return session?.data
    } catch (e) {
        return null
    }
}

export async function getCategory() {
    try {
        const session = await api.get("api/category/all/getAllCategories")
        if (session.status != 200)
            alert("Error get product type ")
        return session.data

    } catch (e) {
        alert("Error get product type ")
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

export async function getAllOrder() {
    try {
        const session = await api.get("/api/order/all/getAllOrder")
        return session?.data
    } catch (e) {
        return null
    }
}

export async function saveProduct(product: Product | undefined) {
    try {
        const headers = getToken()
        const session = await api.post("api/warehouse/admin/addProduct", product)
        return session
    } catch (e) {
        return null
    }
}

export async function addOrder(body: any) {
    try {
        const session = await api.post("api/order/all/addOrder", body)
        return session?.data
    } catch (e) {
        return null
    }
}

export async function updateOrder(body: any) {
    try {
        const session = await api.put("api/order/all/updateOrder", body)
        return session?.data
    } catch (e) {
        return null
    }
}

export async function getProduct(id: string) {
    try {
        const session = await api.get("api/warehouse/getProduct" + "/" + id)
        if (session.status != 200)
            alert("Error get product " + id)

        console.log(session)
        return session.data
    } catch (e) {
        alert("Error get product " + id)
        return null
    }
}
