import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'Financial',
        items: ['item_groups', 'items','purchase_orders', 'sales'],
    },
    {
        text: 'System',
        items: ['users', 'vendors', 'uom', 'customer'],
    },
    {
        text: 'Catalog',
        items: ['products', 'categories', 'attributes', 'attributeFamily'],
    }
];

export const sideNavItems: SideNavItems = {

    // Financial
    purchase_orders: {
        // icon: 'dollar-sign',
        text: '₹ Purchases',
        link: '/purchase_orders'
    },
    item_groups: {
        icon: 'btc',
        text: 'Item Groups',
        link: '/item_groups'
    },
    items: {
        icon: 'columns',
        text: 'Items',
        link: '/items'
    },
    sales: {
        // icon: 'table',
        text: '₹ Sales',
        link: '/sales'
    },


    // System
    users: {
        icon: 'columns',
        text: 'Users',
        link: '/pos/users'
    },
    vendors: {
        icon: 'columns',
        text: 'Vendors',
        link: '/pos/vendors'
    },
    uom: {
        icon: 'columns',
        text: 'UOM',
        link: '/pos/uom'
    },

    customer: {
        icon: 'columns',
        text: 'Customers',
        link: '/customer_management'
    },


    // Catalog
    products: {
        icon: 'tachometer-alt',
        text: 'Products',
        link: '/catalog/products',
    },
    categories: {
        icon: 'tachometer-alt',
        text: 'Categories',
        link: '/catalog/categories'
    },
    attributes: {
        icon: 'tachometer-alt',
        text: 'Attributes',
        link: '/catalog/attributes'
    },
    attributeFamily: {
        icon: 'tachometer-alt',
        text: 'Attribute Family',
        link: '/catalog/attributeFamily'
    },



    // dashboard: {
    //     icon: 'tachometer-alt',
    //     text: 'Dashboard',
    //     link: '/dashboard',
    // },


    // sales: {
    //     icon: 'tachometer-alt',
    //     text: 'Sales',
    //     link: '/sales/orders'
    // },
    // shipments: {
    //     icon: '',
    //     text: 'Shipments',
    //     link: '/sales/shipments'
    // },
    // invoices: {
    //     icon: '',
    //     text: 'Invoices',
    //     link: '/sales/invoices'
    // },
    // refunds: {
    //     icon: '',
    //     text: 'Refunds',
    //     link: '/sales/refunds'
    // },

    pages: {
        icon: 'book-open',
        text: 'Products',
        submenu: [
            {
                text: 'Authentication',
                submenu: [
                    {
                        text: 'Login',
                        link: '/auth/login',
                    },
                    {
                        text: 'Register',
                        link: '/auth/register',
                    },
                    {
                        text: 'Forgot Password',
                        link: '/auth/forgot-password',
                    },
                ],
            },
            {
                text: 'Error',
                submenu: [
                    {
                        text: '401 Page',
                        link: '/error/401',
                    },
                    {
                        text: '404 Page',
                        link: '/error/404',
                    },
                    {
                        text: '500 Page',
                        link: '/error/500',
                    },
                ],
            },
        ],
    },

    // charts: {
    //     icon: 'chart-area',
    //     text: 'Charts',
    //     link: '/charts',
    // },
    // tables: {
    //     icon: 'table',
    //     text: 'Tables',
    //     link: '/tables',
    // },

};
