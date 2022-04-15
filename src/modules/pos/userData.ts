interface Data {
    user_id: number,
    user_avatar: File,
    username: string,
    email: string,
    phoneNumber: number,
    outlet_name: string,
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

export interface UserData {
    user: Users
}

// For edit form patch value
export interface SearchUser {
    users: Users
}

export interface FetchUser {
    show_data: Data2[]
}

interface Data2 {
    user_id: number,
    first_name: string,
    lastname: string,
    username: string,
    email: string,
    email_verified_at: string,
    confirm_password: string,
    Outlet_name: string,
    outlet_status: string,
    phone_no: number
    user_avatar: string,
    status: string,
    created_at: string,
    updated_at: string
}
