import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: ' ',
        items: ['dashboard']
    },
    {
        text: 'Expenses',
        items: ['item_groups', 'items', 'purchase_orders'],
    },
    {
        text: 'Sales',
        items: ['sales', 'table_management'],
    },  
    {
        text: 'Catalog',
        items: ['products', 'categories'],
    },
    {
        text: 'System',
        items: ['users', 'vendors', 'uom', 'customer'],
    },
    {
        text: 'Reports',
        items: ['expense_by_group', 'monthly_expense'],
    },
];

// Sales
// -------
// Sales
// Menu Items
// Menu Categories
// Tables Management

// Expenses
// -----------
// Items
// Item Groups
// Purchases
export const sideNavItems: SideNavItems = {

    // Expenses
    purchase_orders: {
        icon: 'shopping-cart',
        text: 'Purchases',
        link: '/purchase_orders'
    },
    item_groups: {
        icon: 'cubes',
        text: 'Item Groups',
        link: '/item_groups'
    },
    items: {
        icon: 'cube',
        text: 'Items',
        link: '/items'
    },

    // Sales
    sales: {
        icon: 'cash-register',
        text: 'Sales',
        link: '/sales'
    },
    
    table_management: {
        icon: 'table',
        text: 'Table Management',
        link: '/sales/table_management'
    },



    // System
    users: {
        icon: 'user',
        text: 'Users',
        link: '/pos/users'
    },
    vendors: {
        icon: 'users-cog',
        text: 'Vendors',
        link: '/pos/vendors'
    },
    uom: {
        icon: 'balance-scale-left',
        text: 'UOM',
        link: '/pos/uom'
    },

    customer: {
        icon: 'users',
        text: 'Customers',
        link: '/customer_management'
    },

    // Reports
    expense_by_group: {
        icon: 'wallet',
        text: 'Expense By Item Group',
        link: '/reports/expense_by_group',
    },
    monthly_expense: {
        icon: 'wallet',
        text: 'Monthly Expense',
        link: '/reports/monthly_expense',
    },


    // Catalog

    products: {
        icon: 'clipboard-list',
        text: 'Menu Items',
        link: '/catalog/products',
    },
    categories: {
        icon: 'list-alt',
        text: 'Menu Categories',
        link: '/catalog/categories'
    },

    // attributes: {
    //     icon: 'bars',
    //     text: 'Attributes',
    //     link: '/catalog/attributes'
    // },
    // attributeFamily: {
    //     icon: 'bars',
    //     text: 'Attribute Family',
    //     link: '/catalog/attributeFamily'
    // },



    dashboard: {
        icon: 'chart-area',
        text: 'Dashboard',
        link: '/dashboard',
    },


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
