const productsModel = require("../models/productsModel")



const getAllProducts = async () => {
    const products = await productsModel.find({})
    return products
}

const getAllProductsExpensiveFrom = async ({minPrice}) => {
    const products = await productsModel.find({price:{$gt:minPrice}})
    return products
}

const getProductById = async ({id}) => {
    const person = await productsModel.findById(id)
    return person
}


const createProduct = async ({prod}) => {
    const finalProduct = new productsModel(prod)
    await finalProduct.save()
    return "Created"
}

const updateProduct = async ({prod}) => {
    console.log(prod)
    await productsModel.findByIdAndUpdate(prod._id, prod)
    return "Updated"
}

const updateProductPrice = async ({id, price}) => {
    await productsModel.findByIdAndUpdate(id, {$set: {price}})
    return "Updated price"
}

const deleteProduct = async ({id}) => {
    await productsModel.findByIdAndDelete(id)
    return "Deleted"
}

const deleteProductByColor = async ({color}) => {
    await productsModel.deleteMany({ color: color })
    return "Deleted by color"
}



module.exports = { getAllProducts , getAllProductsExpensiveFrom ,getProductById , createProduct,updateProduct , updateProductPrice , deleteProduct , deleteProductByColor}