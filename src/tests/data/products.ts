import { NewProduct } from "../../types/NewProduct";
import { Product } from "../../types/Product";
import { category1, category2, category3 } from "./category";

const product1: Product = {
    id: 1,
    title: "a product",
    price: 100,
    description: "product1",
    images: [],
    category: category1
}
const product2: Product = {
    id: 2,
    title: "b product",
    price: 110,
    description: "product2",
    images: [],
    category: category2
}
const product3: Product = {
    id: 3,
    title: "c product",
    price: 130,
    description: "product1",
    images: [],
    category: category3
}
const product4: Product = {
    id: 4,
    title: "d product",
    price: 140,
    description: "product4",
    images: [],
    category: category3
}
const newProduct: NewProduct = {
    title: "E product",
    price: 500,
    description: "new product",
    images: [""],
    categoryId: 2
}
const invalidProduct: NewProduct = {
    title: "B product",
    price: 0,
    description: "new product",
    images: [],
    categoryId: 20
}
export { product1, product2, product3, product4, newProduct, invalidProduct}