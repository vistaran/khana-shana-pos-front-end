export interface Data {
    id: number,
    Outlet_name: string,
    Outlet_Address: string,
    Country: string,
    State: string,
    City: string,
    Postcode: number,
    Status: string,
    created_at: Date,
    updated_at: Date,
    inventory_source: string
}
interface Outlets {
    current_page: number;
    data: Data[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}
export interface OData {
    outlets: Outlets;
}

export interface OutletSearch {
    Outlets: Outlets
}


