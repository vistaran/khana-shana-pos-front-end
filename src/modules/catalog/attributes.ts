export interface Adata {
    Attributes: Attributes

}

interface Attributes {
    current_page: number,
    data: Data[],
    first_page_url: string,
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

interface Data {
    id: number,
    attribute_based: string,
    attribute_code: string,
    name: string,
    type: string,
    validation_required: string,
    validation_unique: string,
    input_validation: string,
    value_per_local: string,
    value_per_channel: string,
    use_in_layered: string,
    use_to_create_configuration_product: string,
    visible_on_productview_page_front_end: string,
    create_in_product_flat_table: string,
    attribute_comparable: string,
    created_at: Date,
    updated_at: Date
}


