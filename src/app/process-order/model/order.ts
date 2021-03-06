export interface Order {
    id: string;
    created_at: string;
    items: Array<Item>;
    recipient: {
        name: string,
        email: string
    };
    delivery: {
        courier: string,
        method: string
    };
    charge_customer: {
        currency: string,
        total_price: string
    };
    totalItemPrice?: number;
}

export interface Item {
    id: string;
    name: string;
    quantity: number;
    total_price: {
        currency: string,
        amount: string
    };
}
