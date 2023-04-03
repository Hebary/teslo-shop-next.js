export interface DashboardResponse {
        orders            : number
        paidOrders        : number
        notPaidOrders     : number
        numberOfClients   : number
        numberOfProducts  : number
        productsOutOfStock: number
        lowInventory      : number    
}