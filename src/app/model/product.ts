export interface Product {
    title: string;
    price: number;
    category: string;
    imageUrl: string;
}

export interface KeyedProduct extends Product {
    key: string;
}
