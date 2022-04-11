export interface Items {
    purchase_items: PurchaseItems
}

interface PurchaseItems {
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
    created_at: Date
    group_name: string
    id: number
    item_group_id: number
    item_name: string
    unit_id: number
    unit_name: string
    updated_at: Date
}