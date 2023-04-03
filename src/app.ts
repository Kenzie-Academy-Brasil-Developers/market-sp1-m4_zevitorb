import express, { Application } from "express"
import { createProduct, deleteproduct, readAllProducts, readOneProduct, updateProduct } from "./logic"
import { checkProductNameExistOnCreate, checkProductNameExistOnUpdate, ensureProductExist, filterProductsBySection } from "./middlewares"

const app: Application = express()
app.use(express.json())

app.post("/products", checkProductNameExistOnCreate, createProduct)
app.get("/products", filterProductsBySection, readAllProducts)
app.get("/products/:id", ensureProductExist, readOneProduct)
app.patch("/products/:id", ensureProductExist, checkProductNameExistOnUpdate, updateProduct)
app.delete("/products/:id", ensureProductExist, deleteproduct)

const PORT = 3000
const messageServerStart = `Server is running in localhost:${PORT}`

app.listen(PORT, () => {
    console.log(messageServerStart)
})  