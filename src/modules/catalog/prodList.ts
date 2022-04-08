export interface ProductData {
    products: Product
}

interface Product {
    current_page: number,
    data: Data[],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string,
    to: number,
    total: number
}

export interface Data {
    id: number,
    product_name: string,
    description: string,
    price: number,
    category_id: number
}

// export interface PatchData {
//     products: PatchProduct
// }

// interface PatchProduct {
//     category_id: 1
//     category_name: string
//     created_at: Date
//     description: string
//     id: number
//     price: number
//     product_name: string
//     updated_at: Date

// }