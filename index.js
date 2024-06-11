const express = require('express');
const app = express();
const port = 8000;

const cors = require("cors")
const { createHandler } = require("graphql-http/lib/use/express")
const { buildSchema } = require("graphql")

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/productDB").then(() => console.log("Connected to DB"))


const perSrv = require("./Services/productService")

console.log(perSrv)


app.use(cors())

const schema = buildSchema(
    `   

    input ProductInput {
       
        name: String
        price: Int
        color:String
    }

    input updateProductInput {
        _id: String
        name: String
        price: Int
        color:String
    }

    type Product {
        _id: String
        name: String
        price: Int
        color:String
    }

  
    type Query {
        allProducts: [Product]
        getAllProductsExpensiveFrom(minPrice : Int):[Product]
        getProductById(id: String): Product

    }

     type Mutation {
        addProduct(prod: ProductInput) : String
        updateProduct(prod: updateProductInput) : String
        updateProductPrice(id:String,price:Int):String
        deleteProduct(id:String):String
        deleteProductByColor(color:String):String
}

    `
)

// query => get data
// mutation => change data (create, update,delete)

const root = {
    allProducts: perSrv.getAllProducts,
    getAllProductsExpensiveFrom: perSrv.getAllProductsExpensiveFrom,
    getProductById: perSrv.getProductById,
    addProduct: perSrv.createProduct,
    updateProduct: perSrv.updateProduct,
    updateProductPrice:perSrv.updateProductPrice,
    deleteProduct:perSrv.deleteProduct,
    deleteProductByColor:perSrv.deleteProductByColor
}


app.use("/graphql", createHandler({
    schema,
    rootValue: root

}))




const path = require("path")


app.get("/graphiql", (req, res) => {
    res.sendFile(path.join(__dirname, "./graphql.html"))
})



app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});