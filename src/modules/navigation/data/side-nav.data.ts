import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard', 'sales', 'catalog', 'customer'],
    },
    {
        text: 'POS',
        items: ['layouts', 'vendors', 'uom', 'pages'],
    },
    {
        text: 'ADDONS',
        items: ['items', 'item_groups', 'purchase_orders', 'charts', 'tables'],
    },

];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    catalog: {
        icon: 'tachometer-alt',
        text: 'Catalog',
        link: '/catalog/products',
    },
    customer: {
        icon: 'tachometer-alt',
        text: 'Customers',
        link: '/customer_management'
    },
    // categories: {
    //     icon: '',
    //     text: 'Categories',
    //     link: '/catalog/categories'
    // },
    // attributes: {
    //     icon: '',
    //     text: 'Attributes',
    //     link: '/catalog/attributes'
    // },
    // attributeFamily: {
    //     icon: '',
    //     text: 'Attribute Family',
    //     link: '/catalog/attributeFamily'
    // },
    sales: {
        icon: 'tachometer-alt',
        text: 'Sales',
        link: '/sales/orders'
    },
    shipments: {
        icon: '',
        text: 'Shipments',
        link: '/sales/shipments'
    },
    invoices: {
        icon: '',
        text: 'Invoices',
        link: '/sales/invoices'
    },
    refunds: {
        icon: '',
        text: 'Refunds',
        link: '/sales/refunds'
    },
    layouts: {
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
    items: {
        icon: 'table',
        text: 'Items',
        link: '/items'
    },
    item_groups: {
        icon: 'table',
        text: 'Item Groups',
        link: '/item_groups'
    },
    purchase_orders: {
        icon: 'table',
        text: 'Purchase Orders',
        link: '/purchase_orders'
    },
    charts: {
        icon: 'chart-area',
        text: 'Charts',
        link: '/charts',
    },
    tables: {
        icon: 'table',
        text: 'Tables',
        link: '/tables',
    },

};
