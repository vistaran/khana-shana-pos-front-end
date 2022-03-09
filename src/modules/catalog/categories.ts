interface Data {
    attributes: string,
    id: number,
    name: string,
    visible_in_menu: string,
    position: number,
    display_mode: string,
    decription: string,
    image: string,
    category_logo: string,
    parent_category: string,
    meta_title: string,
    slug: string,
    meta_description: string,
    meta_keyword: string,
    status: string,
    created_at: Date,
    updated_at: Date,
    product_id: number,
    number_of_products: number
}

interface categories {
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
export interface Cdata {
    Category: categories
}

export interface SearchCategory {
    Category: categories
}



