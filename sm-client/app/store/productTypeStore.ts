import {getCategory} from "@/lib/session";

export default class ProductTypeStore {
    productTypes: ProductType[]

    constructor() {
        this.productTypes = []
        this.getProductType().then(r => {
        })
    }

    getProductType = async () => {
        const response = await getCategory();
        this.productTypes = response
    }

}