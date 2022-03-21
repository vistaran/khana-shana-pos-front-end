export interface AFData {
    Attributes: Attribute
    // id: number,
    // code: string,
    // name: string
}

interface Attribute {
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
    attribute_family_code: string,
    attribute_family_name: string,
    created_at: Date,
    updated_at: Date
}

export interface AttributeFamilySearch {
    Attributes_Family: Attribute
}

// Group
export interface EditFamily {
    groups: Group
}

interface Group {
    current_page: number,
    data: EditData[],
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

interface EditData {
    id: number,
    group_name: string,
    group_based: string,
    created_at: Date,
    updated_at: Date
}

export interface FamilyAttribute {
    attribute_group_show: InsData
}

interface InsData {
    attribute_id: number,
    group_id: number,
    attribute_family_id: number,
    attribute_based: string,
    attribute_code: string,
    name: string,
    type: string
}