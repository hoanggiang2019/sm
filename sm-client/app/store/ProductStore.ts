export default class ProductStore {
    productList: Product[]
    saveProduct?: Product

    constructor() {
        this.productList = [];
        this.saveProduct = undefined
    }
}