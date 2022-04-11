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

// Address interface
export interface Address {
    customerAddress: CustomerAddress[]
}

export interface CustomerAddress {
    id: number,
    user_id: number,
    address_type_id: number,
    address_type: string,
    address_line_1: string,
    address_line_2: string,
    address_line_3: string,
    city: string,
    state: string,
    contry: string,
    postalcode: number,
    latitude: number,
    longitude: number,
    created_at: Date,
    updated_at: Date
}