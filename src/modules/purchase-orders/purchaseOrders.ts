export interface PurchaseOrder {
    orders: Orders
}

interface Orders {
    current_page: number
    data: Data[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: string
    to: number
    total: number
}

export interface Data {
    id: number
    vendor_id: number
    user_id: number
    notes: string
    shipping_charge: number
    total_amount: number
    items: Items[]
}

interface Items {
    id: number,
    notes: string,
    item_id: number,
    item_name: string,
    item_group_id: number,
    item_group_name: string,
    qty: number,
    unit_id: number,
    unit_name: string,
    subtotal: number
}

export interface ItemsData {
    purchase_items: PurchaseItems
}

interface PurchaseItems {
    current_page: number
    data: ItemData[]
    first_page_url: string
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

interface ItemData {
    id: number,
    item_name: string,
    item_group_id: number,
    unit_id: number,
    created_at: Date,
    updated_at: Date,
    unit_name: string,
    group_name: string
}