export interface PData {
    Products: Product
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

interface Data {
    id: number,
    sku: string,
    name: string,
    product_type: string,
    status: string,
    price: number,
    quantity: number,
    created_at: Date,
    updated_at: Date,
    attribute_family_name: string
}
// "Products": {
//     "current_page": 1,
//     "data": [
//         {
//             "id": 1,
//             "sku": "Bennie Dietrich",
//             "name": "Annalise Murazik",
//             "product_type": "simple",
//             "status": "deactive",
//             "price": 6,
//             "quantity": 6,
//             "created_at": "2022-03-08T16:55:27.000000Z",
//             "updated_at": "2022-03-08T16:55:27.000000Z",
//             "attribute_family_name": "default"
//         },

//     ],
//     "first_page_url": "http://127.0.0.1:8000/api/product/show?page=1",
//     "from": 1,
//     "last_page": 5,
//     "last_page_url": "http://127.0.0.1:8000/api/product/show?page=5",
//     "next_page_url": "http://127.0.0.1:8000/api/product/show?page=2",
//     "path": "http://127.0.0.1:8000/api/product/show",
//     "per_page": 10,
//     "prev_page_url": null,
//     "to": 10,
//     "total": 50
// }
// }