export interface Order {
    id: string;
    created_at: string;
    items: Array<Item>;
    recipient: {
        name: string,
        email: string
    },
    total_price: {
        currency: string,
        amount: number
    }
    delivery: {
        courier: string,
        method: string
    },
    charge_customer: {
        currency: string,
        total_price: string
    }
}

interface Item {
    id: string;
    name: string;
    quantity: number;
}