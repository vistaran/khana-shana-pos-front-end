interface Data {
    user_id: number,
    user_avatar: File,
    username: string,
    email: string,
    phoneNumber: number,
    Outlet_name: string,
    status: string,
    created_at: Date
}

interface Users {
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

export interface UData {
    user: Users
}

export interface SearchUser {
    Users: Users
}

