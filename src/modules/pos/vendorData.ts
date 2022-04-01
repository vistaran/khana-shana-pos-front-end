export interface Vendors {
    vendors: VendorDetail
    id: number,
    name: string,
    address: string,
    phone: number
}

interface VendorDetail {
    current_page: number,
    data: Data[],
    first_page_url: string,
    from: number
    last_page: number,
    last_page_url: string,
    next_page_url: string,
    path: string,
    per_page: number
    prev_page_url: string,
    to: number
    total: number
}

interface Data {
    name: string,
    phone_number: number,
    address: string,
    status: string
}