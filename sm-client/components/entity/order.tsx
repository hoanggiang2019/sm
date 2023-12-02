interface Order {
    id: number | undefined,
    shipperId: number | undefined,
    shipper: User,
    productId: number | undefined,
    product: Product | undefined,
    quantity: 0,
    price: 0
    status: 0
}