export interface OData {
    id: number,
    subTotal: number,
    grandTotal: number,
    orderDate: Date,
    channelName: string,
    status: string,
    billedTo: string,
    shippedTo: string
}