import { NextFunction, Request, Response } from "express"
import productsDb  from "./database"
import { IProducts, TProductsRequest } from "./interfaces"

export const ensureProductExist = (request: Request, response: Response, next: NextFunction): Response | void => {
    const {id} = request.params

    const findIndex: number = productsDb.findIndex(product => product.id  === Number(id))

    if(findIndex === -1){
        return response.status(404).json({
            "error": "Product not found"
        })
    }

    response.locals.productIndex = findIndex

    return next()
}

export const filterProductsBySection = (request: Request, response: Response, next: NextFunction): void => {
    const { section } = request.query

    const filterProducts: IProducts[] = productsDb.filter(product => product.section === section)

    if(filterProducts.length > 0){
        response.locals.products = filterProducts
        return next()
    }

    response.locals.products = productsDb

    return next()
}

export const checkProductNameExistOnCreate = (request: Request, response: Response, next: NextFunction): Response | void => {
    const name = request.body.map((product: IProducts) => productsDb.filter(productDb => product.name === productDb.name))
    const checkName = name.findIndex((item: TProductsRequest[]) => item.length > 0)

    if(checkName !== -1){
        return response.status(409).json({
            "error": "Product already registered"
        })
    }

    return next()
}

export const checkProductNameExistOnUpdate = (request: Request, response: Response, next: NextFunction): Response | void => {
    const requestBodyArray = [request.body]

    const name = requestBodyArray.map((product: IProducts) => productsDb.filter(productDb => product.name === productDb.name))
    const checkName = name.findIndex((item: TProductsRequest[]) => item.length > 0)

    if(checkName !== -1){
        return response.status(409).json({
            "error": "Product already registered"
        })
    }

    return next()
}

