import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { product1, product2, product3, product4 } from '../data/products'
import { Product } from '../../types/Product'
import { NewProduct } from '../../types/NewProduct'
import categories from '../data/category'

const productServer = setupServer(
    rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
        return res(
            ctx.json([product1, product2, product3, product4]),
        )
    }),
    rest.post("https://api.escuelajs.co/api/v1/products/", async (req, res, ctx) => {
        const newProduct = await req.json() as NewProduct
        const category = categories.find(c => c.id === newProduct.categoryId)
        const error: string[] = []
        let product: Product|null = null
        if (!(newProduct.price > 0)) {
            error.push("price must be a positive number")
        }
        if (!Array.isArray(newProduct.images)) {
            error.push("images must be an array")
        } else if (newProduct.images.length < 1) {
            error.push("images must contain at least 1 image")
        } else if (newProduct.images.some(item => typeof item !== "string")) {
            error.push("images must be an array of string")
        }
        if (!category) {
            error.push("category does not exist")
        } else {
            product = {
                title: newProduct.title,
                price: newProduct.price,
                category: category,
                description: newProduct.description,
                images: newProduct.images,
                id: 1
            }
        }
        if (error.length > 0) {
            return res(
                ctx.status(400),
                ctx.json({
                    statusCode: 400,
                    message: error,
                    error: "Bad Request"
                })
            )
        }
        return res(
            ctx.status(201),
            ctx.json(product)
        )
    })
)

export default productServer
