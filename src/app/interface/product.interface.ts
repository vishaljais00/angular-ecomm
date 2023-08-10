export interface product{
    product_name: string ,
    product_price: number,
    product_color: string,
    category: string,
    product_url: string,
    description: string,
    quantity: number,
    id: number
}


export interface cart{
    product_name: string ,
    product_price: number,
    product_color: string,
    category: string,
    product_url: string,
    description: string,
    quantity: number,
    id: number | undefined,
    productId: number,
    userId: number
}
