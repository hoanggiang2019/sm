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
        alert("Nhập sai tên đăng nhập hoặc mật khẩu")
        return null
    }
}

export async function register(body: any) {
    try {
        const response = await api.post("api/v1/auth/register", body)
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
        if (session?.status == 200)
            return session.data
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

export async function getAllProduct(typeSelect: string) {
    try {
        const headers = getToken()
        if (typeSelect != '0') {
            const s = '/' + typeSelect;
            const session = await api.get("api/warehouse/getAllProduct" + s,{headers})
            return session
        } else {
            const session = await api.get("api/warehouse/getAllProduct",{headers})
            return session
        }
    } catch (e) {
        return null
    }
}
export async function deleteProduct(typeSelect: string) {
    try {
        const headers = getToken()
        const session = await api.delete("/api/warehouse/deleteProduct/" + typeSelect,{headers})
        return session
    } catch (e) {
        return null
    }
}
export async function deleteOrder(typeSelect: string) {
    try {
        const headers = getToken()
        const session = await api.delete("/api/order/deleteOrder/" + typeSelect,{headers})
        return session
    } catch (e) {
        return null
    }
}
export async function confirmOrder(typeSelect: string) {
    try {
        const headers = getToken()
        const session = await api.get("/api/order/confirmOrder/" + typeSelect,{headers})
        return session
    } catch (e) {
        return null
    }
}

export async function getAllOrder(body: any) {
    try {
        const headers = getToken()
        const session = await api.post("/api/order/getAll", body,{headers})
        return session?.data
    } catch (e) {
        return null
    }
}
export async function getReport(date: string) {
    try {
        const headers = getToken()
        const session = await api.get("/api/report/admin/getAllReport/" + date, {headers})
        return session?.data
    } catch (e) {
        return null
    }
}

export async function saveProduct(product: Product | undefined) {
    try {
        const headers = getToken()
        const session = await api.post("api/warehouse/addProduct", product, {headers})
        return session
    } catch (e) {
        return null
    }
}
export async function saveCategory(body: any) {
    try {
        const headers = getToken()
        const session = await api.post("api/category/addCategory", body, {headers})
        return session
    } catch (e) {
        return null
    }
}
export async function deleteCategory(body: any) {
    try {
        const headers = getToken()
        const session = await api.delete("api/category/deleteCategory/"+ body, {headers})
        return session
    } catch (e) {
        return null
    }
}
export async function updateProduct(product: any) {
    try {
        const headers = getToken()
        const session = await api.put("api/warehouse/updateProduct", product, {headers})
        return session
    } catch (e) {
        return null
    }
}

export async function addOrder(body: any) {
    try {
        const headers = getToken()
        return await api.post("api/order/addOrder", body, {headers})
    } catch (e) {
        return null
    }
}
export async function updateOrder(body: any) {
    try {
        const headers = getToken()
        return await api.put("api/order/updateOrder", body, {headers})
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
