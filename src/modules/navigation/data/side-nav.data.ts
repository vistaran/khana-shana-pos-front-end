import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard'],
    },
    {
        text: 'SALES',
        items: ['orders','shipments','invoices','refunds'],
    },
    {
        text: 'CATALOG',
        items: ['products','categories','attributes','attributeFamily'],
    },
    {
        text: 'POS',
        items: ['layouts', 'pages'],
    },
    {
        text: 'ADDONS',
        items: ['charts', 'tables'],
    },

];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    products: {
        icon: '',
        text: 'Products',
        link: '/catalog/products',
    },
    categories: {
        icon: '',
        text: 'Categories',
        link: '/catalog/categories'
    },
    attributes: {
        icon: '',
        text: 'Attributes',
        link: '/catalog/attributes'
    },
    attributeFamily: {
        icon: '',
        text: 'Attribute Family',
        link: '/catalog/attributeFamily'
    },
    orders: {
        icon: '',
        text: 'Orders',
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
