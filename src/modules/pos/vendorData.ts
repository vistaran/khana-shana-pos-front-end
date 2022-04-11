export interface Vendors {
    vendors: VendorDetail
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

export interface Data {
    name: string,
    phone_numbers: number,
    address: string,
    status: string,
    created_at: Date,
    updated_at: Date
}