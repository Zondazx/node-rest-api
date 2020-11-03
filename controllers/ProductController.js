const Product = require("../models/ProductModel");
const { getPostData } = require("../utils");

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @desc Gets all products
 * @route GET /api/products
 */
async function getProducts(request, response) {
    try {
        const products = await Product.findAll();

        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @param {*} id of the requested product
 * @desc Gets the requested product
 * @route GET /api/products/:id
 */
async function getProduct(request, response, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            response.writeHead(404, {
                "Content-Type": "application/json"
            });
            response.end(JSON.stringify({
                message: "Product Not Found"
            }));
        } else {
            response.writeHead(200, {
                "Content-Type": "application/json"
            });
            response.end(JSON.stringify(product));
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {*} request 
 * @param {*} resolve
 * @desc Creates a Product
 * @route POST /api/products
 */
async function createProduct(request, response) {
    try {
        
        const body = await getPostData(request);

        const { name, description, price } = JSON.parse(body);

        const product = {
            name,
            description,
            price
        };

        const newProduct = await Product.create(product);

        response.writeHead(201, {
            "Content-Type": "application/json"
        });

        return response.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct
};