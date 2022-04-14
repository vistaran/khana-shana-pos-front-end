export interface Orders
{
    orders: OrderData
}

interface OrderData {
    current_page: number,
    data: Data[]
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

export interface Data {
    id: number,
    user_id: number,
    payment_mode: string,
    customer_id: number,
    notes: string,
    shipping_charge: number,
    total_amount: number,
    created_at: Date,
    updated_at: Date
}