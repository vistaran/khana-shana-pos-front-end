export interface OData {
    outlets: {
        current_page: number;
        data: [
            id: number,
            Outlet_name: string,
            Outlet_Address: string,
            Country: string,
            State: string,
            City: string,
            Postcode: number,
            status: string,
            created_at: Date,
            updated_at: Date,
            inventory_source: string
        ];
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
    };
}
