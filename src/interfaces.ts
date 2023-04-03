export interface IProducts{
    id: number,
    name: string,
    price: number,
    weight: number,
    section: "food" | "cleaning",
    expirationDate: Date
}

export type TProductsRequest = Omit<IProducts, "id" | "expirationDate">

export interface ICleaningProduct extends IProducts{}

export type TCleaningProductRequest = TProductsRequest

export interface IFoodProduct extends IProducts{
    calories: number
}

export type TFoodProduct = Omit<IFoodProduct, "id" | "expirationDate">