export interface ItemGroups {
    item_groups: ItemGroupsData
}

interface ItemGroupsData {
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
    id: number,
    group_name: string
}