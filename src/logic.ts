import productsDb from "./database"
import { ICleaningProduct, IFoodProduct, IProducts, TCleaningProductRequest, TFoodProduct } from "./interfaces"
import { Request, Response } from "express"

function* idGenerator(){
    let i = 0
    while(true){
        yield i++
    }
}

const customID = idGenerator()

const aYearFromNow = new Date();
aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);

const totalPriceProducts = (data: IProducts[]) => {
    const totalPrice = data.reduce((acc, curr) => acc + curr.price, 0)

    const newObj = {
        "total": totalPrice,
        "marketProducts": [...data]
    }

    return newObj
}

export const createProduct = (request: Request, response: Response): Response => {
    const productData: Array<TFoodProduct | TCleaningProductRequest> = request.body

    const newData = productData.map(product => ({...product, id: Number(customID.next().value) + 1, expirationDate: aYearFromNow}))

    newData.map(product => productsDb.push(product))

    return response.status(201).json(totalPriceProducts(newData))
}

export const readAllProducts = (request: Request, response: Response): Response => {
    return response.json(totalPriceProducts(response.locals.products))
}

export const readOneProduct = (request: Request, response: Response): Response => {
    return response.status(200).json(productsDb[response.locals.productIndex])
}

export const updateProduct = (request: Request, response: Response): Response => {
    const actualProduct = productsDb[response.locals.productIndex]

    const newInfos = request.body

    if("section" || "id" || "expirationDate" in newInfos){
        delete newInfos.id
        delete newInfos.section
        delete newInfos.expirationDate
    }

    const updateProduct: IFoodProduct | ICleaningProduct = {
        ...actualProduct,
        ...newInfos
    }

    productsDb[response.locals.productIndex] = updateProduct

    return response.status(200).json(updateProduct)
}

export const deleteproduct = (request: Request, response: Response): Response => {
    const actualProduct = response.locals.productIndex

    productsDb.splice(actualProduct, 1)
    
    return response.status(204).json()
}