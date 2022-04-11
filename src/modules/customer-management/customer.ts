export interface CustomerData {
    customers: Customers
}

interface Customers {
    id: number
    first_name: string
    last_name: string
    phone_number: number
    email: string
    home_address: string
    office_address: string
    other_address: string
    created_at: Date
    updated_at: Date
}