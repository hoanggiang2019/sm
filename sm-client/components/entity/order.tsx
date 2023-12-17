interface Order {
    id: number | undefined,
    shipperId: number | undefined,
    shipper: User,
    productId: number | undefined,
    product: Product | undefined,
    quantity: 0,
    numReturn: 0,
    freeShip: 0,
    cash: 0,
    price: 0
    status: 0
}