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


// "user": {
//     "current_page": 1,
//     "data": [
    // "user_id": 2,
    // "user_avatar": "user - lg . jpg",
    // "username": "ricky.lang",
    // "email": "madelyn25@gmail.com",
    // "Outlet_name": "Dr. Lucious Bradtke II",
    // "status": "inactive",
    // "created_at": null
//     ],
//     "first_page_url": "https://posapidemo.vistaran.com/api/user/show?page=1",
//     "from": null,
//     "last_page": 1,
//     "last_page_url": "https://posapidemo.vistaran.com/api/user/show?page=1",
//     "next_page_url": null,
//     "path": "https://posapidemo.vistaran.com/api/user/show",
//     "per_page": 10,
//     "prev_page_url": null,
//     "to": null,
//     "total": 0
//   }
// }


